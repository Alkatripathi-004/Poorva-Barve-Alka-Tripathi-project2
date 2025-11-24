import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">
                <img src="/icons8-sudoku-64.png" alt="Sudoku Logo" />
                <span>Sudoku</span>
            </NavLink>
            <ul className="navbar-links">
                <li><NavLink to="/games/easy">Easy</NavLink></li>
                <li><NavLink to="/games/normal">Normal</NavLink></li>
                <li><NavLink to="/games">Selection</NavLink></li>
                <li><NavLink to="/rules">Rules</NavLink></li>
                <li><NavLink to="/scores">Scores</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;