import React, { useEffect, useState } from 'react';
import firebase from './firebase';


const AuthProvider = ({ childeren }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {childeren}
        </AuthContext.Provider>
    );
};



export default AuthProvider;
export const AuthContext = React.createContext();