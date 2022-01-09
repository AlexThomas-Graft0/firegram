// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt8hS3OjSbb6uRWHXZdw3Wp2hfQshSMlE",
  authDomain: "firegram-498ca.firebaseapp.com",
  projectId: "firegram-498ca",
  storageBucket: "firegram-498ca.appspot.com",
  messagingSenderId: "628252107992",
  appId: "1:628252107992:web:3bb936ff5d79d5f8a0e3ad",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
