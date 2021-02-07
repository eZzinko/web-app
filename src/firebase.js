import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArIqqJZKEI1RJv7nSO55WB2FTl55CHH7Q",
    authDomain: "wamp-7d290.firebaseapp.com",
    projectId: "wamp-7d290",
    storageBucket: "wamp-7d290.appspot.com",
    messagingSenderId: "705460892565",
    appId: "1:705460892565:web:b3bffb19f0a5132bb93c9c",
    measurementId: "G-GKDHPBYMQE"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
