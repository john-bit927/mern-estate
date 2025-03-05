// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e2bee.firebaseapp.com",
  projectId: "mern-estate-e2bee",
  storageBucket: "mern-estate-e2bee.firebasestorage.app",
  messagingSenderId: "467515543930",
  appId: "1:467515543930:web:444117cb902c1b7886c6c3",
  measurementId: "G-L3RCXNSKD6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);