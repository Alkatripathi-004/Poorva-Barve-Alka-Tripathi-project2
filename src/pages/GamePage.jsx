import React from 'react';
import { useParams } from 'react-router-dom';
import { GameProvider, GameContext } from '../context/GameContext';
import Board from '../components/Board';
import Timer from '../components/Timer';
import GameControls from '../components/GameControls';
import './GamePage.css'; 

const GamePageContent = () => {
    const { isComplete } = React.useContext(GameContext);
    return (
        <div className="game-page">
            {isComplete && <div className="congratulations-message">Congratulations! You solved it!</div>}
            <Timer />
            <Board />
            <GameControls />
        </div>
    );
};

const GamePage = () => {
    const { mode } = useParams(); 

    if (mode !== 'easy' && mode !== 'normal') {
        return <div>Invalid game mode.</div>;
    }

    return (
        <GameProvider mode={mode}>
            <GamePageContent />
        </GameProvider>
    );
};

export default GamePage;