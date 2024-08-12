import React, { useContext, useState, useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { AuthContext } from "../providers/auth-provider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login.css';
import {
    UserNotFoundError,
    IncorrectPasswordError,
    DuplicateEmailError
} from '../errors/CustomErrors';

import googleBtnSigning from "../images/google_btns/google_sign_in.png";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const authContext = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    // useEffect(() => {
    //     console.log('Immediate Error Message:', errorMessage);
    // }, [errorMessage]);

    useEffect(() => {
        // console.log('Immediate Error Message:', errorMessage);

        const checkForRedirect = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                // Check if redirected to login page with status 302
                if (searchParams.has('error') && searchParams.get('error') === 'duplicate_email') {
                    const duplicateEmailError = new DuplicateEmailError();
                    console.log(duplicateEmailError.message);
                    setErrorMessage(duplicateEmailError.message);
                }
            } catch (error) {
                console.error('Google Sign-In failed:', error.message);
            }
        };

        checkForRedirect();
    }, [errorMessage]); // Dependency on errorMessage ensures it runs when errorMessage changes

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const loginResult = await authContext.LoginIn(username, password);

            if (loginResult.status === 'success') {
                setUsername('');
                setPassword('');
                setIsLoggedIn(true);
                setErrorMessage('');
            } else {
                // Handle specific error types
                if (loginResult.message instanceof UserNotFoundError) {
                    setErrorMessage(loginResult.message.message);
                } else if (loginResult.message instanceof IncorrectPasswordError) {
                    setErrorMessage(loginResult.message.message);
                }
            }
        } catch (error) {
           if (error instanceof UserNotFoundError) {
               setErrorMessage(error.message);
           } else if (error instanceof IncorrectPasswordError) {
               setErrorMessage(error.message);
           } else if (error.message) {
               setErrorMessage(error.message);
           }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4000/requests', { method: 'post', credentials: 'include' });
            const data = await response.json();
            window.location.replace(data.url);
        } catch (error) {
            console.error('Google Sign-In failed:', error.message);
        }
    };

    const handleNotRegisteredSignIn = () => {
        navigate('/SignIn');
    };

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="login-form">
            <div className="loginIconContainer">
                <FontAwesomeIcon icon={faUser} size="2xl" className="loginIcon" />
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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="google-sign-in">
                    <button type="button" onClick={handleGoogleSignIn}>
                        <img src={googleBtnSigning} alt="Google Sign In" />
                    </button>
                </div>

                <div className="sign-in">
                    <button type="button" onClick={handleNotRegisteredSignIn}>
                        Not registered? Please sign in
                    </button>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
