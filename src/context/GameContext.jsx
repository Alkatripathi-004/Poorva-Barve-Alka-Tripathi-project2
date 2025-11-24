// src/context/GameContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { generatePuzzle } from '../logic/sudokuLogic'; // We only need generatePuzzle here now

export const GameContext = createContext();

// A new, more robust validation function that lives inside the context
const validateBoard = (board) => {
    const size = board.length;
    const newBoard = JSON.parse(JSON.stringify(board)); // Work on a copy

    // Reset all errors first
    for (const r of newBoard) {
        for (const cell of r) {
            cell.isIncorrect = false;
        }
    }

    // Helper to find and mark duplicates in an array of cells
    const findAndMarkDuplicates = (cells) => {
        const counts = {};
        for (const cell of cells) {
            if (cell.value !== 0) {
                counts[cell.value] = (counts[cell.value] || 0) + 1;
            }
        }
        for (const cell of cells) {
            if (counts[cell.value] > 1) {
                cell.isIncorrect = true;
            }
        }
    };

    // Check all rows and columns
    for (let i = 0; i < size; i++) {
        const row = newBoard[i];
        const column = newBoard.map(r => r[i]);
        findAndMarkDuplicates(row);
        findAndMarkDuplicates(column);
    }

    // Check all subgrids
    const subgridSize = size === 6 ? [2, 3] : [3, 3]; // [rows, cols]
    for (let r = 0; r < size; r += subgridSize[0]) {
        for (let c = 0; c < size; c += subgridSize[1]) {
            const subgrid = [];
            for (let rowInBox = 0; rowInBox < subgridSize[0]; rowInBox++) {
                for (let colInBox = 0; colInBox < subgridSize[1]; colInBox++) {
                    subgrid.push(newBoard[r + rowInBox][c + colInBox]);
                }
            }
            findAndMarkDuplicates(subgrid);
        }
    }

    return newBoard;
};


export const GameProvider = ({ children, mode }) => {
    const [initialBoard, setInitialBoard] = useState([]);
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const [isComplete, setIsComplete] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const newGame = () => {
        const { board: puzzleBoard, solution: puzzleSolution } = generatePuzzle(mode);
        const formattedBoard = puzzleBoard.map(row => 
            row.map(value => ({
                value: value,
                isInitial: value !== 0,
                isIncorrect: false,
            }))
        );
        setInitialBoard(JSON.parse(JSON.stringify(formattedBoard)));
        setBoard(formattedBoard);
        setSolution(puzzleSolution);
        setIsComplete(false);
        setTimer(0);
        setIsRunning(true);
    };

    const resetGame = () => {
        setBoard(JSON.parse(JSON.stringify(initialBoard)));
        setIsComplete(false);
        setTimer(0);
        setIsRunning(true);
    };

    const updateCellValue = (row, col, value) => {
        if (isComplete) return;

        const newBoard = JSON.parse(JSON.stringify(board));
        const numValue = value === '' ? 0 : parseInt(value, 10);
        
        const maxVal = mode === 'easy' ? 6 : 9;
        if (numValue < 0 || numValue > maxVal || isNaN(numValue)) return;
        
        newBoard[row][col].value = numValue;

        const validatedBoard = validateBoard(newBoard);
        setBoard(validatedBoard);
    };
    
    const selectCell = (row, col) => {
        setSelectedCell({ row, col });
    };

    useEffect(() => {
        let interval;
        if (isRunning && !isComplete) {
            interval = setInterval(() => {
                setTimer(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, isComplete]);

    useEffect(() => {
        if (board.length === 0 || isComplete) return;

        const isFilled = board.every(row => row.every(cell => cell.value !== 0));
        const hasNoErrors = board.every(row => row.every(cell => !cell.isIncorrect));

        if (isFilled && hasNoErrors) {
            const isCorrect = board.every((row, rIndex) => 
                row.every((cell, cIndex) => cell.value === solution[rIndex][cIndex])
            );
            
            if (isCorrect) {
                setIsComplete(true);
                setIsRunning(false);
            }
        }
    }, [board, solution, isComplete]);
    
    useEffect(() => {
        newGame();
    }, [mode]);

    const contextValue = {
        board,
        selectedCell,
        isComplete,
        timer,
        newGame,
        resetGame,
        updateCellValue,
        selectCell,
        mode
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};