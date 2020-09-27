import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

//Source: https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            axios.defaults.headers.common["Authorization"] !== undefined ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;