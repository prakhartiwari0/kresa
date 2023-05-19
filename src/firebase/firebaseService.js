import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default {
    user: null,

    initialize() {
        onAuthStateChanged(auth, (user) => {
            this.user = user;
        });
    },

    signOut() {
        signOut(auth);
    },
};