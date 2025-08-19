// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Change "adminToken" to whatever you used in localStorage
    const token = localStorage.getItem("adminToken");
    if (!token) {
        // Redirect to login page if not logged in
        return <Navigate to="/unifinder/login/admin" replace />;
    }
    // If token exists, render the protected children
    return children;
};

export default ProtectedRoute;
