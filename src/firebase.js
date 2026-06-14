import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVUlpJJAlxcoTRYKb5KrFtLl9M9LBWR5E",
  authDomain: "medilens-b0277.firebaseapp.com",
  projectId: "medilens-b0277",
  storageBucket: "medilens-b0277.firebasestorage.app",
  messagingSenderId: "400666420242",
  appId: "1:400666420242:web:7e6c82c1525b975189a4cb",
  measurementId: "G-SNMY4PWXX2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider =
  new GoogleAuthProvider();
  console.log("Firebase Project:", app.options.projectId);
console.log("Auth Domain:", app.options.authDomain);