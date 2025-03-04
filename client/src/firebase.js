// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-191c2.firebaseapp.com",
  projectId: "real-estate-191c2",
  storageBucket: "real-estate-191c2.firebasestorage.app",
  messagingSenderId: "1012155986899",
  appId: "1:1012155986899:web:ade3732dacb4b21a1ef526",
  measurementId: "G-ZD0FD6S29E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);