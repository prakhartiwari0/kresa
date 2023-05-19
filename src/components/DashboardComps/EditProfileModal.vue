<template>
    <div class="editprofilemodalbackcover">

        <dialog ref="editprofilemodal_ref"
                class="editprofilemodal">
            <button @click="$emit('closeEditprofileModalClicked')"
                    class="closeeditprofilemodal_button  material-symbols-outlined">close</button>

            <h2>Enter Profile Details</h2>


            <button class="default_button">Submit</button>


        </dialog>
    </div>
</template>

<script>


import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase/firebase';

import firebaseService from "@/firebase/firebaseService";

export default {
    date() {
        return{

        }
    },
    mounted() {
        this.$refs.editprofilemodal_ref.showModal()

            console.log(firebaseService.user);
        // onAuthStateChanged(auth, (user) => {
        //     this.user = user;

        //     console.log(user);
        //     console.log(user.photoURL);
        // });
            // console.log(this.user.name);


        // this.$refs.nameinputprofile_ref.focus()
    },
    methods: {


    }

}
</script>

<style>
.editprofilemodal::backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.331);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
}


.editprofilemodal {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border: none;
    border-radius: 2rem;
    padding: 1rem;

    margin: auto;
}


.eachinputgroup {
    margin-block: 1rem;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}

.eachinputgroup label {
    margin-block: 0.2rem;
    margin-inline: 0.5rem;
}

.eachinputgroup input[type="text"],
.eachinputgroup textarea {
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;
    border: rgba(128, 128, 128, 0.55) 2px solid;
}

.eachinputgroup textarea {
    resize: none;
    padding: 1rem;

}

.eachinputgroup input[type="text"]:focus {
    outline: none;
}

.closeeditprofilemodal_button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    border-radius: 100%;
    height: 3rem;
    width: 3rem;
    color: black;

    user-select: none;
}

.closeeditprofilemodal_button:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.472);
}</style>