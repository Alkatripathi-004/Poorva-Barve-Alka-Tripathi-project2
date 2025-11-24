import React from 'react';
import { Link } from 'react-router-dom';
import './SelectionPage.css';

const SelectionPage = () => {
    const games = [
        { name: 'Sunny Squares', author: 'Aria Quinn', icon: '/icons8-sun-48.png', link: '/games/easy' },
        { name: 'Easy Breeze', author: 'Leo Park', icon: '/icons8-breeze-64.png', link: '/games/easy' },
        { name: 'Calm Grid', author: 'Mira Chen', icon: '/icons8-woman-in-lotus-position-48.png', link: '/games/normal' },
        { name: 'Morning Puzzle', author: 'Jae Lee', icon: '/icons8-morning-48.png', link: '/games/normal' },
        { name: 'Gentle Start', author: 'Nisha Das', icon: '/icons8-start-48.png', link: '/games/easy' },
    ];

    return (
        <div className="selection-page-container">
            <h1>Choose a Puzzle</h1>
            <ul className="puzzle-list">
                {games.map((game, index) => (
                    <li key={index}>
                        <img src={game.icon} alt="puzzle icon" className="puzzle-icon" />
                        <div className="puzzle-info">
                            <Link to={game.link} className="puzzle-title">{game.name}</Link>
                            <span className="author">by {game.author}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectionPage;