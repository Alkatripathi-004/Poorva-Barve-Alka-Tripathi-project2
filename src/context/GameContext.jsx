import React, { createContext, useState, useEffect } from 'react';
import { generatePuzzle, checkMove } from '../logic/sudokuLogic';

export const GameContext = createContext();

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
        setInitialBoard(JSON.parse(JSON.stringify(formattedBoard))); // Deep copy
        setBoard(formattedBoard);
        setSolution(puzzleSolution);
        setIsComplete(false);
        setTimer(0);
        setIsRunning(true);
    };

    const resetGame = () => {
        setBoard(JSON.parse(JSON.stringify(initialBoard))); // Deep copy
        setIsComplete(false);
        setTimer(0);
        setIsRunning(true);
    };

    const updateCellValue = (row, col, value) => {
        if (isComplete) return;

        const newBoard = [...board];
        const numValue = value === '' ? 0 : parseInt(value, 10);
        
        const maxVal = mode === 'easy' ? 6 : 9;
        if (numValue < 0 || numValue > maxVal || isNaN(numValue)) return;
        
        newBoard[row][col].value = numValue;

        for (let r = 0; r < newBoard.length; r++) {
            for (let c = 0; c < newBoard.length; c++) {
                if (newBoard[r][c].value !== 0 && !newBoard[r][c].isInitial) {
                    newBoard[r][c].isIncorrect = !checkMove(newBoard, r, c, newBoard[r][c].value);
                }
            }
        }
        
        setBoard(newBoard);
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
        if (board.length === 0) return;
        const isFilled = board.every(row => row.every(cell => cell.value !== 0));
        const hasNoErrors = board.every(row => row.every(cell => !cell.isIncorrect));

        if (isFilled && hasNoErrors) {
            setIsComplete(true);
            setIsRunning(false);
        }
    }, [board]);
    
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