import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/auth-provider';

const Admin = ({ component: Component, userId }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await fetch('http://127.0.0.1:4000/admin', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    await signOut();
                }
            } catch (error) {
                console.error('Error fetching admin status:', error);
                setIsAdmin(false);
                await signOut();
            }
        };

        checkAdminStatus();
    }, [signOut]);

    if (!isAdmin) {
        return <p>You must sign in first!</p>;
    }

    return (
        <div>
            {Component ? (
                userId !== undefined ? <Component userId={userId} /> : <Component />
            ) : null}
        </div>
    );
};

export default Admin;
