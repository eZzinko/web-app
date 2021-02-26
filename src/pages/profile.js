//Modules
import React, { useContext, useState, useEffect } from 'react';

//FIrebase
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';


const Profile = () => {

    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const user = firebase.auth().currentUser;

    const setUserData = () => {
        user.updateProfile({
            displayName: userName,
        })
        window.alert("Jméno bylo úspěšně změněno!");
    }

    useEffect(() => {
        document.title = `${currentUser.displayName} | Moje kuchařka`;
    })

    return (
        <>
            <div className="login-page">
                <div className="login-card">
                    <div className="login-card-header">
                        <h2>Informace o profilu</h2>
                    </div>
                    <div className="login-card-body">
                        <label htmlFor="name">Jméno a příjmení</label>
                        <input
                            id="name"
                            type="test"
                            defaultValue={currentUser.displayName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Jméno a příjmení"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            // defaultValue={currentUser.email}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="example@example.com"
                            disabled
                        />
                    </div>
                    <div className="login-card-footer">
                        <button onClick={setUserData}>Uložit</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;