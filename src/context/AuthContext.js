 import React, { createContext, useState, useEffect } from 'react';

// --- Configuration ---
// CORRECTED: Pointing to your backend on port 3002
const API_URL = 'https://stock-trading-backend-pi.vercel.app/api/auth';
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
                    
                    const response = await fetch(`${API_URL}/verify`, {
                        method: 'GET',
                        headers: {
                            
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    const userData = await response.json();

                    if (response.ok) {
                         
                        setUser(userData);
                    } else {
                         
                        console.error("Token verification failed:", userData.message);
                        localStorage.removeItem('token');
                        window.location.href = LOGIN_URL;
                    }
                } catch (error) {
                    
                    console.error("An error occurred during token verification:", error);
                    localStorage.removeItem('token');
                    window.location.href = LOGIN_URL;
                }
            }
            
            setLoading(false);
        };

        verifyUser();
    }, []);  

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