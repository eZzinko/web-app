import React, { useEffect, useState } from "react";
import firebase from "../firebase.js";

export const AuthContext = React.createContext();


export const AuthProvider = ({ children, setLogged, currentUser, setCurrentUser }) => {


    const [loading, setLoading] = useState(true);



    if (currentUser === null) {

        setLogged(false)
    }
    else {

        setLogged(true);
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    },
        // eslint-disable-next-line 
        []);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <h1>Loading User...</h1>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};