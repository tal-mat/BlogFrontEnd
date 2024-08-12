import React, { useState, useContext, useEffect } from 'react';
import '../styles/EditUser.css';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { UsersContext } from '../providers/users-provider';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export function EditUserForm({ userId }) {
    const { updateUser, getUserById } = useContext(UsersContext);
    const { register, handleSubmit, formState, reset } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 120;
    const maxDate = new Date(maxYear, 11, 31);
    const minDate = new Date(minYear, 0, 1);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUserById(userId);
                setUser(fetchedUser);
            } catch (error) {
                setErrorMessage('Failed to fetch user data.');
            }
        };
        fetchUser();
    }, [userId, getUserById]);

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
                gender: user.gender,
                address: user.address,
                phoneNumber: user.phoneNumber,
                registrationDate: user.registrationDate ? new Date(user.registrationDate).toISOString().split('T')[0] : '',
                accountStatus: user.accountStatus,
                role: user.role,
            });
        }
    }, [user, reset]);

    const handleEditUserSubmit = async (data) => {
        const userData = { id: userId, ...data };
        try {
            await updateUser(userData);
            reset();
            setShowModal(true);
        } catch (error) {
            setErrorMessage('Failed to update user details.');
        }
    };

    const handleBackToManagement = () => {
        setShowModal(false);
        navigate('/admin/UserManagement');
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    if (!user) {
        return <p>User doesn't exist.</p>;
    }

    return (
        <div className="edit-user-form">
            <h2>Edit User Details</h2>
            <form onSubmit={handleSubmit(handleEditUserSubmit)}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    {...register('firstName', { required: true, pattern: /^[a-zA-Z]+$/ })}
                    required
                />
                {formState.errors.firstName && formState.errors.firstName.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid first name with only English letters and no spaces.<br /></span>
                )}

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    {...register('lastName', { required: true, pattern: /^[a-zA-Z]+$/ })}
                    required
                />
                {formState.errors.lastName && formState.errors.lastName.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid last name with only English letters and no spaces.<br /></span>
                )}

                <label htmlFor="username">Username</label>
                <input {...register('username')} />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    {...register('email', {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    required
                />
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

                <label htmlFor="gender">Gender</label>
                <select {...register('gender')}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="address">Address</label>
                <input {...register('address')} />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    {...register('phoneNumber', {
                        required: true,
                        pattern: /^\d{10}$/,
                    })}
                    required
                />
                {formState.errors.phoneNumber && formState.errors.phoneNumber.type === 'pattern' && (
                    <span className="text-danger">Please enter a valid 10-digit phone number.<br /></span>
                )}

                <label htmlFor="registrationDate">Registration Date</label>
                <input
                    type="date"
                    {...register('registrationDate', {
                        required: true,
                        min: format(minDate, 'yyyy-MM-dd'),
                        max: format(maxDate, 'yyyy-MM-dd'),
                    })}
                    min={format(minDate, 'yyyy-MM-dd')}
                    max={format(maxDate, 'yyyy-MM-dd')}
                    required
                />
                {formState.errors.registrationDate && (
                    <span className="text-danger">{formState.errors.registrationDate.message}<br /></span>
                )}

                <label htmlFor="accountStatus">Account Status</label>
                <select {...register('accountStatus')}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>

                <label htmlFor="role">Role</label>
                <select {...register('role')}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Update User</button>
            </form>
            {showModal && (
                <Modal
                    message="User details updated successfully!"
                    onConfirm={handleBackToManagement}
                    onCancel={handleCancel}
                    ConfirmMsg="Back to User's Management"
                    CancelMsg="Stay on this page"
                />
            )}
        </div>
    );
}

export default function EditUser({ userId }) {
    return (
        <div>
            <EditUserForm userId={userId} />
        </div>
    );
}
