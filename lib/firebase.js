import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDlGgOcKbEHqeRN2G1GHEqbX1DGP_Mz4fk",
    authDomain: "fireship-io-project.firebaseapp.com",
    projectId: "fireship-io-project",
    storageBucket: "fireship-io-project.appspot.com",
    messagingSenderId: "636121598151",
    appId: "1:636121598151:web:0908b8fbd03a9e24c7d6e2",
    measurementId: "G-WFSZVD6TLK",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage().ref();
