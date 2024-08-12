import React, { useState } from 'react';
import hashPassword from '../functions/HashedPassword';
import '../styles/resetPassword.css';

const SetPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        let hashedPassword = hashPassword(event.target.value);
        setNewPassword(hashedPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform password validation here if needed

        // Password successfully set
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);

        // Reset form fields
        setOldPassword('');
        setNewPassword('');
        setErrorMessage('');
    };

    return (
        <div className="set-password-container">
            <h2>Set New Password</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="set-password-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <button type="submit">Set Password</button>
            </form>
        </div>
    );
};


export default SetPassword;
