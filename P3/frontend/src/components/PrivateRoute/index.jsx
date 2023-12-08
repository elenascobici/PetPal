import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return (
        token ? children : <Navigate to="/sign-up" />
    )
}

export default PrivateRoute;