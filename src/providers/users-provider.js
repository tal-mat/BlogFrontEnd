import React, { createContext, useEffect, useState  } from "react";


export const UsersContext = createContext(null);

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);

    const fetchUsersData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4000/users', {
                method: 'GET',
                credentials: 'include'
            });

            // console.log(("users response: ", response));

            if (!response.ok) {
                throw new Error('Network fetch users data response was not ok.');
            }

            const usersData = await response.json();
            // console.log("usersData: ", usersData);
            setUsers(usersData);
            // console.log("users: ", users);
        } catch (error) {
            throw new Error(`There was a problem with the fetch users data operation: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, [])

    const getUserById = async (userID) => {
        try {
            console.log(`Fetching user with ID: ${userID}`);
            const response = await fetch(`http://127.0.0.1:4000/users/${userID}`, {
                method: 'GET',
                credentials: 'include'
            });

            console.log("User response:", response);

            if (!response.ok) {
                throw new Error('Network fetch user data response was not ok.');
            }

            const user = await response.json();
            console.log("Fetched user:", user);
            return user;
        } catch (error) {
            console.error(`There was a problem with the fetch user data operation: ${error.message}`);
            throw new Error(`There was a problem with the fetch user data operation: ${error.message}`);
        }
    };

    const RemoveUser = async (user) =>
    {
        try {
            const response = await fetch(`http://127.0.0.1:4000/users/${user.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                alert('User deleted successfully!');
                await fetchUsersData(); // Refresh user data after deletion
            } else {
                alert('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting user.');
        }
    }

    const updateUser = async  (updatedUser) => {
        console.log("updateUser function called with:", updatedUser);
        try {
            const response = await fetch(`http://127.0.0.1:4000/users/${updatedUser.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Fetch response:", response); // Log the fetch response
            await fetchUsersData();


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem updating the post:', error);

        }
    };


    const value = {
        users,
        setUsers,
        fetchUsersData,
        getUserById,
        RemoveUser,
        updateUser
    };

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    );
}

export default UsersProvider;
