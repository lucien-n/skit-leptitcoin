// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB8Pp3t1YyopjCattnoPfZJv9k5_6ShU4Q",
    authDomain: "fkit-le-ptit-coin.firebaseapp.com",
    projectId: "fkit-le-ptit-coin",
    storageBucket: "fkit-le-ptit-coin.appspot.com",
    messagingSenderId: "279879282715",
    appId: "1:279879282715:web:94645318f83d917ad048be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
auth.setPersistence(browserLocalPersistence)
export const fs = getFirestore(app)