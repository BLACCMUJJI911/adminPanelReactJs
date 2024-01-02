// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFo0Ug1B5hoeSa__YUZzajJ6ngt5z07pw",
    authDomain: "edonation-6a7c7.firebaseapp.com",
    projectId: "edonation-6a7c7",
    storageBucket: "edonation-6a7c7.appspot.com",
    messagingSenderId: "896813985523",
    appId: "1:896813985523:web:06f65482fd721fa2e09186",
    measurementId: "G-J93JCG6Z2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);