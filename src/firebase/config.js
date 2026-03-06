// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7PUCZLwVxElZQYFqb0i_SlKIYgW5Kbx0",
  authDomain: "luckson-homes.firebaseapp.com",
  projectId: "luckson-homes",
  storageBucket: "luckson-homes.firebasestorage.app",
  messagingSenderId: "721327495034",
  appId: "1:721327495034:web:9c1cdc9243c7d72c7668c3",
  measurementId: "G-1814KSMVJZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
