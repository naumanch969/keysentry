import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAinOx9ps_7sYbQ8o9WOjG650V7sH4Sn-Q",
    authDomain: "password-manager-cb329.firebaseapp.com",
    projectId: "password-manager-cb329",
    storageBucket: "password-manager-cb329.appspot.com",
    messagingSenderId: "667613577641",
    appId: "1:667613577641:web:531aee30b07e74e9b304b8",
    measurementId: "G-22Z1E83V6Z"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()
const analytics = getAnalytics(app);