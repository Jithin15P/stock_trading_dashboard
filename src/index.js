 import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Import the authentication providers and handlers we created
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AuthHandler from './components/AuthHandler';

// 2. IMPORTANT: Import your teacher's "Home" component, which contains the correct layout
import Home from './components/Home';

// 3. Import your main CSS file
import './index.css';

// 4. Get the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// 5. Render the application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* The AuthProvider wraps everything to provide user session data */}
      <AuthProvider>
        <Routes>
          {/* Public route to handle the token redirect from the frontend */}
          <Route path="/auth" element={<AuthHandler />} />

          {/* 
            This is the protected route for your entire dashboard.
            - It matches all paths other than "/auth".
            - It uses the PrivateRoute to check for a valid session.
            - If the session is valid, it renders your teacher's <Home /> component.
          */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);