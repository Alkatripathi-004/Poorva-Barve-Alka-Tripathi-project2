import React from 'react';
import './FormPages.css'; // Shared CSS for login and register

const RegisterPage = () => {
    return (
        <div className="form-container">
            <h1>Register</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="verify-password">Verify Password</label>
                    <input type="password" id="verify-password" name="verify-password" />
                </div>
                <button type="submit" className="submit-button">Create Account</button>
            </form>
        </div>
    );
};

export default RegisterPage;