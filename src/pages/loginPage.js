import React from 'react';
import Login from '../auth/Login';

const LoginPage = ({ setLogged }) => {

    return (
        <>
            {/* <h1>Login Page</h1> */}
            <Login setLogged={setLogged} />
        </>
    );
}
export default LoginPage;