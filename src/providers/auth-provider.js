import React, { createContext, useState } from "react";
import {
    UserNotFoundError,
    IncorrectPasswordError,
    DuplicateUsernameError,
    DuplicateEmailError
} from '../errors/CustomErrors';
import hashPassword from '../functions/HashedPassword';

// Context creation for User
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const LoginIn = async (username, password) => {
        // console.log('Request Payload:', JSON.stringify({username, password}));
        const response = await fetch('http://127.0.0.1:4000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: "include",
        });
        console.log("login response: ", response);

        if (response.ok) {

            const {token, userFirstName} = await response.json();
            // console.log({token, userFirstName});
            // console.log("user first name:", userFirstName);

            // Initialize user object with firstName and empty fields
            setUser({
                userId: '',
                firstName: userFirstName,
                lastName: '',
                userName: '',
                email: '',
                birthDate: '',
                gender: '',
                address: '',
                phoneNumber: '',
                registrationDate: '',
                accountStatus: '',
                role: '',
            });

            // setCookie('token', token, { path: '/' });

            return {status: 'success', message: 'Login successful'};
        } else {
            // console.log('Server Response:', response);

            const errorData = await response.json();

            let errorType = 'UnknownError'; // Default error type

            if (errorData.errorType) {
                errorType = errorData.errorType;
            }

            if (errorType === 'UserNotFoundError') {
                throw new UserNotFoundError(username);
            } else if (errorType === 'IncorrectPasswordError') {
                throw new IncorrectPasswordError();
            } else if (errorType === 'UnknownError') {
                throw new Error('An unexpected error occurred on the server. Please try again later.');
            }
        }
    };


    const signOut = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4000/users/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            if (response.ok) {
                setUser(null);
                // console.log("User signed out successfully.");
            } else {
                console.error("Failed to sign out:", response.statusText);
            }
        } catch (error) {
            console.error("Error occurred during sign out:", error);
        } finally {
            setUser(null);
        }
    };

    const signIn = async (user) => {
        let date = { current: new Date() };

        let newUser = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "birthDate": user.birthDate,
            "gender": user.gender,
            "address": user.address,
            "phoneNumber": user.phoneNumber,
            "registrationDate": date.current,
            "accountStatus": true,
            "role": "user",
        };

        const response = await fetch('http://127.0.0.1:4000/users', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // console.log("Response Server:", response);

        if (response.ok) {
            // User created successfully
            await LoginIn(newUser.username, newUser.password);
            return { status: 'success', message: 'User created and logged in successfully.' };
        } else {
            const errorData = await response.json();

            let errorType = 'UnknownError'; // Default error type

            if (errorData.errorType) {
                errorType = errorData.errorType;
            }

            if (errorType === 'DuplicateUsernameError') {
                throw new DuplicateUsernameError();
            } else if (errorType === 'DuplicateEmailError') {
                throw new DuplicateEmailError();
            } else {
                throw new Error('Unexpected error during user creation. Please try again later.');
            }
        }
    };

    const value = {
        user,
        LoginIn,
        signOut,
        signIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
