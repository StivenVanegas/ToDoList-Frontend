import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const { auth } = useAuth();
    const token = auth.token;

    return (
        <Route {...rest} render={props => (
            token !== "" && restricted ? <Redirect to="/home" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;