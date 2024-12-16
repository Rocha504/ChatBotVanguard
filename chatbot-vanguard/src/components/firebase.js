// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1XrxPUnWyVXCe86LzdQghHp55fe8akvc",
  authDomain: "davq4-2024-92708.firebaseapp.com",
  projectId: "davq4-2024-92708",
  storageBucket: "davq4-2024-92708.firebasestorage.app",
  messagingSenderId: "839744419012",
  appId: "1:839744419012:web:54d073658bb1a665470591"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app as default}