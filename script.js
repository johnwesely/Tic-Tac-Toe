const playerFactory = (name, color) => {
    let score = 0;

    const winRound = () => {
        ++score;
        document.querySelector("#winner").textContent = `${name} Wins the Round!`;
        DisplayHandler.displayRoundWinner();
    }

    const getScore = () => {
        return score;
    }

    const getName = () => {
        return name;
    }

    const getColor = () => {
        return color;
    }

    return {getName, getColor, winRound, getScore};
};


const GameBoard = (() => {

    let board = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];

    const setSquare = (symbol, place) => {
        if (board[place] !== "empty") return;

        board[place] = symbol;
        Game.togglePlayer();
        DisplayHandler.renderBoard();
        checkRoundWin();
    };

    const getBoard = () => {
        return board;
    }

    const checkRoundWin = () => {
        const winningBoards = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        for (let i = 0; i < 8; ++i) {
            for (j = 0; j < 3; ++j) {
                if (board[winningBoards[i][j]] !== "red") break;
                if (j === 2) Game.winRound("red"); 
            }
            for (j = 0; j < 3; ++j) {
                if (board[winningBoards[i][j]] !== "blue") break;
                if (j === 2) Game.winRound("blue");
            }
        }
    };

    const resetBoard = () => {
        board = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
    };

    return {setSquare, checkRoundWin, getBoard, resetBoard};
})();


const Game = (() => {
    let totalScoreToWin;
    let currentPlayer;
    let bluePlayer;
    let redPlayer;
    let squareButtons = [];

    const startGameButton = document.querySelector("#reset").addEventListener("click", () => {
        DisplayHandler.displayStartForm();
    });

    const startGame = (form) => {
        redPlayer = playerFactory(form.redPlayer.value, "red");
        bluePlayer = playerFactory(form.bluePlayer.value, "blue");
        totalScoreToWin = form.pointsToWin.value;
        GameBoard.resetBoard();
        DisplayHandler.renderScoreboard(redPlayer, bluePlayer);
        DisplayHandler.renderBoard();
        DisplayHandler.hideStartForm();
        currentPlayer = redPlayer;
        InitButtons();
        document.querySelector("#reset").textContent = "Reset!"
    };

    const togglePlayer = () => {
        if (currentPlayer === bluePlayer) {
            currentPlayer = redPlayer;
        } else {
            currentPlayer = bluePlayer;
        }
    };

    const InitButtons = () => {
       for (let i = 0; i < 9; ++i) {
           const square = document.querySelector(`#square-${i}`);
           squareButtons[i] = square.addEventListener("click", () => {
                GameBoard.setSquare(currentPlayer.getColor(), i);
                console.log(`square ${i}`);
           });
       }
    };

    const checkGameWin = () => {
        if (redPlayer.getScore() >= totalScoreToWin) {
            document.querySelector("#winner").textContent = `${redPlayer.getName()} Wins the Game!`;
            squareButtons = [];
            return true;
        }

        if (bluePlayer.getScore() >= totalScoreToWin) {
            document.querySelector("#winner").textContent = `${bluePlayer.getName()} Wins the Game!`;
            squareButtons = [];
            return true;
        }
    }

    const winRound = (color) => {
        if (color === "red") {
            redPlayer.winRound();
        } else {
            bluePlayer.winRound();
        }

        if (checkGameWin()) {
            return;
        }

        DisplayHandler.renderScoreboard(redPlayer, bluePlayer);
    }


    return {startGame, togglePlayer, winRound};
})();


const DisplayHandler = (() => {

    const renderBoard = () => {
        let i = 0;
        GameBoard.getBoard().forEach((square) => {
            const squareElement = document.querySelector(`#square-${i++}`);
            if (square === "blue") {
                squareElement.style.backgroundColor = "blue";
            } else if (square === "red") {
                squareElement.style.backgroundColor = "red";
            } else {
                squareElement.style.backgroundColor = "var(--pale-spring)";
            }
        });
    };

    const renderScoreboard = (redPlayer, bluePlayer) => {
        document.querySelector("#red-name").textContent = redPlayer.getName() + " : ";
        document.querySelector("#blue-name").textContent = bluePlayer.getName() + " : ";
        document.querySelector("#red-score").textContent = redPlayer.getScore();
        document.querySelector("#blue-score").textContent = bluePlayer.getScore();
    };

    const displayStartForm = () => {
        document.querySelector(".start-form-background").style.display = "flex";
    };

    const hideStartForm = () => {
        document.querySelector(".start-form-background").style.display = "none";
    };

    const hideWinner = () => {
        document.querySelector(".round-winner").style.display = "none";
        GameBoard.resetBoard();
        renderBoard();
    }

    const displayRoundWinner = () => {
        document.querySelector(".round-winner").style.display = "flex";

    };
    
    return {renderBoard, displayStartForm, hideStartForm, renderScoreboard, hideWinner, displayRoundWinner};
})();

DisplayHandler.renderBoard();