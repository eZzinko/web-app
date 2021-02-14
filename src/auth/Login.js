import React, { useState } from "react";
import firebase from "../firebase";
import { useHistory } from 'react-router-dom';

const Login = ({ setLogged }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // eslint-disable-next-line
    const register = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                resetInput();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const login = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                resetInput();
            })
            .catch((err) => {
                console.error(err);
            });
        setLogged(true);
        history.push('/');
    };

    const resetInput = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <>

            <div className="login-page">
                <div className="login-card">
                    <div className="login-card-header">,
                        <h3>Přihlásit se</h3>
                    </div>
                    <div className="login-card-body">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                        />
                        <label htmlFor="password">Heslo</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>
                    <div className="login-card-footer">
                        {/* <button onClick={register}>Register</button> */}
                        <button onClick={login} className="btns">Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;