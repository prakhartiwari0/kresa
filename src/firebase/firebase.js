
import firebaseConfig from "./firebaseConfig.js"

import { initializeApp } from "firebase/app";


import { getAuth, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";


// Initialize Firebase
initializeApp(firebaseConfig);


export const auth = getAuth();

export const provider = new GithubAuthProvider();