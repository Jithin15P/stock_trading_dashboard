import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/'); // Redirect to the main dashboard page
        } else {
            // If no token, just go to the main page to trigger auth check
            navigate('/');
        }
    }, [searchParams, navigate]);

    return <div>Authenticating...</div>;
};

export default AuthHandler;