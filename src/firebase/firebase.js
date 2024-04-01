import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID, 
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyAfbqSsHXE5vmHkaf3c_QjzfewwoyxQaeo",
    authDomain: "gym-locker.firebaseapp.com",
    databaseURL: "https://gym-locker-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gym-locker",
    storageBucket: "gym-locker.appspot.com",
    messagingSenderId: "271201293381",
    appId: "1:271201293381:web:8e0b668571b24dc40a3f2c",
    measurementId: "G-MLQ53VKC2L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getDatabase();

export { app, auth, firestore, storage, db };