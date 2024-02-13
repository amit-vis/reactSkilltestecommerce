// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH8qGSC9MyCPnmv1XGhGCV6YkkvgSse_U",
  authDomain: "ecom-344ea.firebaseapp.com",
  projectId: "ecom-344ea",
  storageBucket: "ecom-344ea.appspot.com",
  messagingSenderId: "1077991355321",
  appId: "1:1077991355321:web:0932b5faedad67b73dfc68",
  measurementId: "G-FZQ9Y2FXHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)