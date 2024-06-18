import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCXN1KZrMoZ5D_17kiELdq3_7qzLpoL8Lk",
    authDomain: "alchemy-private.firebaseapp.com",
    projectId: "alchemy-private",
    storageBucket: "alchemy-private.appspot.com",
    messagingSenderId: "289781183866",
    appId: "1:289781183866:web:6225a094ab09e5b1d6d2c3"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);