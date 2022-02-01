import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 

const firebaseConfig = {
    apiKey: "AIzaSyB8zzkXoNOvwspUdTkV357jPQxv-oqX2-k",
    authDomain: "ract-fp-journal.firebaseapp.com",
    projectId: "ract-fp-journal",
    storageBucket: "ract-fp-journal.appspot.com",
    messagingSenderId: "107939547026",
    appId: "1:107939547026:web:98d90b0f6f970330a6a34b",
    measurementId: "G-Q0SFQ242JY"
};

const firebaseApp = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider,
    firebaseApp
}