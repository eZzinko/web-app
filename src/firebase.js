//Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

// Firebase SDK & credentials for API & Firestore & Hosting - Config
const firebaseConfig = {
    apiKey: "AIzaSyArIqqJZKEI1RJv7nSO55WB2FTl55CHH7Q",
    authDomain: "wamp-7d290.firebaseapp.com",
    projectId: "wamp-7d290",
    storageBucket: "wamp-7d290.appspot.com",
    messagingSenderId: "705460892565",
    appId: "1:705460892565:web:b3bffb19f0a5132bb93c9c",
    measurementId: "G-GKDHPBYMQE"
};

//FIrebase initialize APP with config
firebase.initializeApp(firebaseConfig);

//Authentification export for "useContext"
export const auth = firebase.auth();

//Default export to rewrite Firebase with my config
export default firebase;
