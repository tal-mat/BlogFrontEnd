import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import '../styles/AdminControlPanel.css';
import { AuthContext } from '../providers/auth-provider';
import {
    DuplicateUsernameError,
    DuplicateEmailError
} from '../errors/CustomErrors';
import { useCookies } from 'react-cookie';
import  jwtDecode  from 'jwt-decode';

import hashPassword from '../functions/HashedPassword';


export function SignInForm() {
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit, formState, reset } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['cookieName']);

    // Calculate the min and max allowed years for the birth date
    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 120;

    // Calculate the min and max dates based on the min and max years
    const maxDate = new Date(maxYear, 11, 31); // December 31st of maxYear
    const minDate = new Date(minYear, 0, 1);   // January 1st of minYear

    useEffect(() => {
        try {
            fetch('http://127.0.0.1:4000/oauth/get-token-cookie', {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Failed to fetch token');
                    }
                })
                .then(cookie => {
                    console.log("Cookie:", cookie);
                    const token = cookies['token']
                    console.log("Token from cookie: ", token);

                    if (token) {
                        try {
                            // Decode the token to extract the user data
                            const { MY_SECRET } = process.env;

                            // Decode the token to extract the user data
                            const decodedToken = jwtDecode(token);
                            const userData = decodedToken.appUserData;
                            console.log(userData);

                            if (userData) {
                                // Pre-fill the form fields with the user data
                                reset({
                                    firstName: userData.firstName,
                                    lastName: userData.lastName,
                                    email: userData.email,
                                    registrationDate: userData.registrationDate,
                                    accountStatus: userData.accountStatus,
                                    role: userData.role,
                                });

                                console.log("User data pre-filled:", userData);
                            } else {
                                console.error('User data not found in the token.');
                            }
                        } catch (error) {
                            console.error('Error decoding or decrypting token:', error);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching token:', error);
                });
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    }, [reset]);

    const handleSignInSubmit = async (data) => {
        console.log('Form submitted with data:', data);

        const user = {
            username: data.username,
            // password: hashPassword(data.password),
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            birthDate: data.birthDate,
            gender: data.gender,
            address: data.address,
            phoneNumber: data.phoneNumber,
        };

        try {
            const signInResult = await signIn(user);

            if (signInResult.status === 'success') {
                // Clear any previous error messages
                setErrorMessage('');
                navigate('/'); // Navigate to the index page on success
                reset(); // Reset the form
            } else if (signInResult.status === 'error') {
                if (signInResult.message instanceof DuplicateUsernameError) {
                    setErrorMessage(signInResult.message.message)
                } else if (signInResult.message instanceof DuplicateEmailError) {
                    setErrorMessage(signInResult.message.message)
                }
            }
        } catch (error) {
            if (error instanceof DuplicateUsernameError) {
                setErrorMessage(error.message);
            } else if (error instanceof DuplicateEmailError) {
                setErrorMessage(error.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="admin-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(handleSignInSubmit)}>
                <label htmlFor="username">Username:</label>
                <input type="text"
                       {...register('username',
                           { required: true })}
                       required />
                {formState.errors.username && (
                    <span className="text-danger">Please enter your username.<br /></span>
                    )}

                <label htmlFor="password">Password:</label>
                <input type="password"
                       {...register('password',
                           { required: true })}
                       required />
                {formState.errors.password && (
                    <span className="text-danger">Please enter your password.<br /></span>
                )}

                <label htmlFor="firstName">First Name:</label>
                <input type="text"
                       {...register('firstName',
                           { required: true,
                               pattern: /^[a-zA-Z]+$/
                           })} required />
                {formState.errors.firstName && formState.errors.firstName.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid first name with only English letters and no spaces.<br /></span>
                )}

                <label htmlFor="lastName">Last Name:</label>
                <input type="text"
                       {...register('lastName',
                           { required: true,
                               pattern: /^[a-zA-Z]+$/
                           })} required />
                {formState.errors.lastName && formState.errors.lastName.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid last name with only English letters and no spaces.<br /></span>
                )}

                <label htmlFor="email">Email:</label>
                <input type="email"
                       {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                })} required />
                {formState.errors.email && formState.errors.email.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid email address.<br /></span>
                )}

                <label htmlFor="birthDate">Birth Date:</label>
                <input
                    type="date"
                    {...register('birthDate', {
                        required: true,
                        min: format(minDate, 'yyyy-MM-dd'),
                        max: format(maxDate, 'yyyy-MM-dd'),
                    })}
                    min={format(minDate, 'yyyy-MM-dd')}
                    max={format(maxDate, 'yyyy-MM-dd')}
                    required
                />
                {formState.errors.birthDate && (
                    <span className="text-danger">{formState.errors.birthDate.message}<br /></span>
                )}


                <label htmlFor="gender">Gender:</label>
                <select
                    {...register('gender',
                        { required: true
                        })} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="address">Address:</label>
                <textarea
                    {...register('address',
                        { required: true
                        })} required>
                </textarea>

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel"
                       {...register('phoneNumber', {
                           required: true,
                           pattern: /^\d{10}$/
                       })} required />
                {formState.errors.phoneNumber && formState.errors.phoneNumber.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid 10-digit phone number.<br /></span>
                )}

                <button type="submit">Sign In</button>
            </form>
            <p className="error-message">{errorMessage}</p>
        </div>
    );
}
