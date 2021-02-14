import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext);

    // console.log(currentUser);

    return (

        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
                // return <Redirect to="/login" />
            }}
        ></Route>
    );
}