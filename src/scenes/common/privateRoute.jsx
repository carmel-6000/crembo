import React from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router';
import { Auth } from '../../Auth/Auth';

const PrivateRoute = ({ component: Component, state, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component activityDetails={state} {...props}/> : <Redirect to='/login' />
    )} />

)

export default PrivateRoute;