
import firebaseConfig from "./firebaseConfig.js"

import { initializeApp } from "firebase/app";



// Authentication imports
import { GithubAuthProvider, onAuthStateChanged, signOut, getAuth } from "firebase/auth";


// Firestore imports
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// import { collection, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";



// Initialize Firebase
// initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);






export const auth = getAuth();
export const provider = new GithubAuthProvider();


// Get Firebase Storage instance
export const storage = getStorage(app);

// Get Firestore instance
export const db = getFirestore(app);


// export { db, storage };
