import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCqFg8DE5gLINBInEt39nOOCvALqcNIaE",
  authDomain: "picked-today.firebaseapp.com",
  projectId: "picked-today",
  storageBucket: "picked-today.appspot.com",
  messagingSenderId: "1021932975946",
  appId: "1:1021932975946:web:4b5cdac5886882ef00f3b3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};