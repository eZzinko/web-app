import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';


const Profile = () => {

    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    // const [userTel, setUserTel] = useState("");

    const user = firebase.auth().currentUser;

    const setUserData = () => {
        user.updateProfile({
            displayName: userName
        })
        window.alert("Jméno bylo úspěšně změněno!");
    }

    return (
        <>
            <h1>Welcome to your profile</h1>
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
                            // defaultValue={currentUser.displayName}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Jméno a příjmení"
                        />
                        <label htmlFor="phone">Konkaktní telefon</label>
                        <input
                            id="phone"
                            type="text"
                            defaultValue={currentUser.phoneNumber}
                            // onChange={(e) => setUserTel(e.target.value)}
                            placeholder="+420 123 456 789"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            defaultValue={currentUser.email}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="example@example.com"
                            disabled
                        />
                    </div>
                    <div className="login-card-footer">
                        <button onClick={setUserData}>Uložit</button>
                    </div>
                </div>


                <div className="login-card">
                    <div className="login-card-header">
                        <h2>Not READY</h2>
                    </div>
                    <div className="login-card-body">
                        <label htmlFor="name">Jméno a příjmení</label>
                        <input
                            disabled
                            id="name"
                            type="test"
                            value={currentUser.displayName}
                            // onChange={(e) => setEmail(e.target.value)}
                            placeholder="Jméno a příjmení"
                        />
                        <label htmlFor="phone">Konkaktní telefon</label>
                        <input
                            disabled
                            id="phone"
                            type="text"
                            value={currentUser.phoneNumber}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="+420 123 456 789"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;