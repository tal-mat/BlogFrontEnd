import React, { createContext, useState } from "react";

// Context creation for User
export const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signIn = ({ userName, password }) => {
        // Check if valid
        setUser({ userName: 'Tal' });
    };

    const signOut = () => {
        setUser(null);
    };

    const value = {
        user,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
