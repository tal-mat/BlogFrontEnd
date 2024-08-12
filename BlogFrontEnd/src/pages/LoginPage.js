import React, {useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../providers/auth-provider";
import '../styles/Login.css';

// import user icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useContext(AuthContext);

    // Manage the state of log in or log out
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Access signIn from authContext
        authContext.signIn({ userName: username, password });
        // Clear form fields after submission
        setUsername('');
        setPassword('');
        setIsLoggedIn(true);
    };

    // If logged in, use Navigate for redirection to home page
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="login-form">
            <div className="loginIconContainer">
                <FontAwesomeIcon icon={faUser} size="2xl"className="loginIcon" />
            </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
