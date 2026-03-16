// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4eFPnZSCy5kXC-dcqoUZ44PHrb6zzXtM",
  authDomain: "hoop-58407.firebaseapp.com",
  projectId: "hoop-58407",
  storageBucket: "hoop-58407.firebasestorage.app",
  messagingSenderId: "437101726252",
  appId: "1:437101726252:web:1d881e2c5f01081c001f89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();