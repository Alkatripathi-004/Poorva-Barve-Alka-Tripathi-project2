import React from 'react';
import './FormPages.css'; // Shared CSS for login and register

const LoginPage = () => {
    return (
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit" className="submit-button">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;