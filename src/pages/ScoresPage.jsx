import React from 'react';
import './ScoresPage.css';

const ScoresPage = () => {
    const highScores = [
        { rank: '1 🏆', player: 'Gridmaster_99', completed: 128 },
        { rank: '2 🥈', player: 'Puzzle_Panda', completed: 117 },
        { rank: '3 🥉', player: 'Ana', completed: 96 },
        { rank: '4', player: 'Zen_Solver', completed: 72 },
        { rank: '5', player: 'Rahul', completed: 54 },
    ];

    return (
        <div className="scores-container">
            <h1>High Scores</h1>
            <div className="scores-table">
                <div className="scores-header">
                    <div>#</div>
                    <div>Player</div>
                    <div>Puzzles Solved</div>
                </div>
                {highScores.map((score, index) => (
                    <div className="scores-row" key={index}>
                        <div>{score.rank}</div>
                        <div>{score.player}</div>
                        <div>{score.completed}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScoresPage;