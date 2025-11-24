const puzzles = {
    easy: [
        // A simple 6x6 puzzle and its solution
        {
            board: [
                [3, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 5, 6],
                [0, 3, 0, 0, 0, 1],
                [5, 0, 0, 0, 6, 0],
                [1, 6, 0, 5, 0, 0],
                [0, 0, 0, 0, 0, 2],
            ],
            solution: [
                [3, 5, 6, 1, 2, 4],
                [2, 4, 1, 3, 5, 6],
                [6, 3, 2, 4, 0, 1],
                [5, 1, 4, 2, 6, 3],
                [1, 6, 3, 5, 4, 0],
                [4, 0, 5, 6, 1, 2],
            ]
        }
    ],
    normal: [
        // A simple 9x9 puzzle and its solution
        {
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9],
            ],
            solution: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ]
        }
    ]
};

export const generatePuzzle = (mode) => {
    const puzzleSet = puzzles[mode];
    const randomIndex = Math.floor(Math.random() * puzzleSet.length);
    return JSON.parse(JSON.stringify(puzzleSet[randomIndex])); 
};


export const checkMove = (board, row, col, num) => {
    const size = board.length;
    
    for (let i = 0; i < size; i++) {
        if (board[row][i].value === num || board[i][col].value === num) {
            return false;
        }
    }

    const subgridSize = Math.sqrt(size);
    const startRow = Math.floor(row / subgridSize) * subgridSize;
    const startCol = Math.floor(col / subgridSize) * subgridSize;

    for (let r = 0; r < subgridSize; r++) {
        for (let c = 0; c < subgridSize; c++) {
            if (board[startRow + r][startCol + c].value === num) {
                return false;
            }
        }
    }

    return true;
};