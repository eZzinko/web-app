import React from 'react';
import Login from '../auth/Login';

const LoginPage = ({ setLogged }) => {

    return (
        <>
            <Login setLogged={setLogged} />
        </>
    );
}
export default LoginPage;