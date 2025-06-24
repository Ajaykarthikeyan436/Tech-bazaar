// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcQIiGvcikNMcwuYPHdojuU9aziHJMkfI",
  authDomain: "tech-bazaar-853cc.firebaseapp.com",
  projectId: "tech-bazaar-853cc",
  storageBucket: "tech-bazaar-853cc.firebasestorage.app",
  messagingSenderId: "592948295869",
  appId: "1:592948295869:web:969f2eb748c33de294dfd4",
  measurementId: "G-MY9RY3JCMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth