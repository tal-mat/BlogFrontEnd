import React, { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../providers/users-provider';
import '../styles/UserManagement.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import {Link} from "react-router-dom";

export function UsersDataTable() {
    const { users, loading, error, RemoveUser, fetchUsersData } = useContext(UsersContext);
    const [showModal, setShowModal] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);


    const handleDeleteUser = (user) => {
        setDeleteUser(user);
        setShowModal(true);
    };

    const confirmDeleteUser = async () => {
        try {
            console.log("deleteUser: ", deleteUser);
            RemoveUser(deleteUser);
            setShowModal(false);
            setDeleteUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleResetPassword = (userId) => {
        // Reset password logic here
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!users || users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <div className="user-management-container">
            <h1>Users Data Management</h1>
            <div className="table-wrapper">
                <table className="user-management-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Birthdate</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Registration Date</th>
                        <th>Account Status</th>
                        <th>Role</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>
                                <button className="ResetPasswordBtn" onClick={() => handleResetPassword(user.id)}>
                                    Password Reset
                                </button>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.birthDate}</td>
                            <td>{user.gender}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.registrationDate}</td>
                            <td>
                                {user.accountStatus ? "Active" : "Inactive"}
                            </td>
                            <td>{user.role}</td>
                            <td>
                                <button className="deleteBtn" onClick={() => handleDeleteUser(user)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "rgb(128, 128, 128)" }} />
                                </button>
                                <button className="editBtn">
                                    <Link to={`/admin/EditUser/${user.id}`} className="editLink">
                                        <FontAwesomeIcon icon={faPencilAlt} size="sm" style={{ color: "rgb(128, 128, 128)" }} />
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <Modal
                    message="Are you sure you want to delete this user?"
                    onConfirm={confirmDeleteUser}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
