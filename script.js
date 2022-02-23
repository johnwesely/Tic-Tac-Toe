const playerFactory = (playerName, symbol) => {
    let score = 0;

    const winGame = () => {
        ++score;
    }

    const getScore = () => {
        return score;
    }

    return {playerName, symbol, winGame, getScore};
};

const gameBoard = (() => {
    let board = [ null, null, null, null, null, null, null, null, null];

    const setSquare = (symbol, place) => {
        if (board[place]) return;

        board[place] = symbol;
    };

    const checkWin = () => {

    };
})();

const game = (() => {
    let currentPlayer = "x";

    const togglePlayer = () => {
        if (currentPlayer === "x") {
            currentPlayer = "y";
        } else {
            currentPlayer = "x";
        }
    };

    
})();