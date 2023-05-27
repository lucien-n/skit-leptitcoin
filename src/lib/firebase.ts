// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import {
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_PROJECT_ID,
    FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID,
    FB_APP_ID
} from '$env/static/private'

const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const fs = getFirestore(app)