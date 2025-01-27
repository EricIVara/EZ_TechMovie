// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "streamlist-17947.firebaseapp.com",
  projectId: "streamlist-17947",
  storageBucket: "streamlist-17947.appspot.com",
  messagingSenderId: "1097680114974",
  appId: "1:1097680114974:web:0c3659a82e5efcb3f1e50f",
  measurementId: "G-HD7L0BNVYY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
