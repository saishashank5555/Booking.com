// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuxdNiwPXbpPihHpjSWs9c4qQEQKmtlZo",
  authDomain: "the-resto-app.firebaseapp.com",
  projectId: "the-resto-app",
  storageBucket: "the-resto-app.firebasestorage.app",
  messagingSenderId: "1026331174257",
  appId: "1:1026331174257:web:54dededa4787832fc242d0",
  measurementId: "G-WCG2KHD436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };