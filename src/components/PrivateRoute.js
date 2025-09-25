 import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';  

 
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

     
    const LOGIN_URL = 'https://stock-trading-frontend-phi.vercel.app/login';

     
    if (loading) {
        return <div>Loading session...</div>;
    }

    
    if (!user) {
        
        window.location.href = LOGIN_URL;
        return null;  
    }

 
    return children;
};

export default PrivateRoute;