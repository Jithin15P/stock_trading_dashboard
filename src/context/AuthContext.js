 // dashboard/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// --- Configuration ---
// Make sure these URLs are correct for your live, deployed applications
const API_URL = 'https://stock-trading-backend-nu.vercel.app/api/auth'; 
const LOGIN_URL = 'https://stock-trading-frontend-phi.vercel.app/login'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // --- THIS IS THE CRITICAL FIX ---
                    // This fetch call sends the token in the correct header format
                    const response = await fetch(`${API_URL}/verify`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    const userData = await response.json();

                    if (response.ok) {
                        // Success! Token is valid. Set the user state.
                        setUser(userData);
                    } else {
                        // The backend rejected the token. It's invalid or expired.
                        console.error("Dashboard: Token verification failed:", userData.message);
                        localStorage.removeItem('token');
                        window.location.href = LOGIN_URL;
                    }
                } catch (error) {
                    // A network error occurred.
                    console.error("Dashboard: An error occurred during token verification:", error);
                    localStorage.removeItem('token');
                    window.location.href = LOGIN_URL;
                }
            }
            // If there's no token, or after verification, stop showing "Loading..."
            setLoading(false);
        };

        verifyUser();
    }, []); // The empty array ensures this runs only once when the dashboard loads.

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('token');
        window.location.href = LOGIN_URL;
    };

    return (
        <AuthContext.Provider value={{ user, loading, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;