import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({component: Component, ...rest}) => {

    const { auth } = useAuth();
    const token = auth.token;

    return (

        <Route {...rest} render={props => (
            token !== "" ? <Component {...props} /> : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;