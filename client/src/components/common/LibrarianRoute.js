import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const LibrarianRoute = ({component: Component, ...rest}) => {
    const t = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(t);
    const currentRoleId = decoded.role;
    
    return (
        // Show the component only when the user is logged in and check if they are librarian
        // Otherwise, redirect the user to /dashboard page
        <Route {...rest} render={props => (
            axios.defaults.headers.common["Authorization"] !== undefined && currentRoleId === 1?
                <Component {...props} />
            : <Redirect to="/dashboard" />
        )} />
    );
};

export default LibrarianRoute;