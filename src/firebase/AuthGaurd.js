// src/services/AuthGuard.js

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default {
    init() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is authenticated, resolve the promise
                    resolve(user);
                } else {
                    // User is not authenticated, reject the promise
                    reject(new Error("User not authenticated"));
                }
            });
        });
    },
};
