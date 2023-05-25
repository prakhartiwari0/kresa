<template>
<template v-if="isConfirmationModalVisible">
    <confirmationPopup msg="Are you sure to edit your Profile Details?" @yesClicked="cofirmedProfileSave" @noClicked="isConfirmationModalVisible =false"/>
</template>

    <div class="editprofilemodalbackcover">

        <dialog ref="editprofilemodal_ref"
                class="editprofilemodal default_modal">
            <button @click="$emit('closeEditprofileModalClicked')"
                    class="closeeditprofilemodal_button actionbutton material-symbols-outlined">close</button>

            <h2>Edit Profile Details</h2>
            
            <div class="editProfileModal_pfp_edit_div">
                <label for="userProfilePic" class="material-symbols-outlined">edit</label>
                <img :src="user.userProfilePic" alt="userProfilePic" class="editProfileModal_pfp_preview_img">
                <input
                
        @change="handleFileSelection"
        accept="image/jpeg"
                ref="userProfilePic" type="file" name="userProfilePic" id="userProfilePic">

            </div>

            <label for="userFirstName">First Name</label>
            <input ref="userFirstName" type="text" id="userFirstName" v-model="editedUserDetails.firstName" class="default_textInput">
            <label for="userLastName">Last Name</label>
            <input ref="userLastName" type="text" id="userLastName"  v-model="editedUserDetails.lastName" class="default_textInput">

        
            <button class="default_button saveEditedDetailsButton" 
            :disabled="!hasChanges"
            @click.prevent="editedProfileSaveClicked">Save</button>


        </dialog>
    </div>
</template>

<script>
import confirmationPopup from "./confirmationPopup.vue";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase/firebase';

import firebaseService from "@/firebase/firebaseService";

import { collection, doc, addDoc, deleteDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";

import {db, storage } from "@/firebase/firebase";


import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default {
    components:{ confirmationPopup },
    data() {
        return{
            isConfirmationModalVisible: false,
            // showSaveProfileDetailsConfirmation: false,
            user: {
                firstName: "",
                lastName: "",
                userProfilePic: "",
            },
            editedUserDetails: {
                firstName: "",
                lastName: "",
                userProfilePic: "",
            },

        }
    },
    mounted() {
        this.$refs.editprofilemodal_ref.showModal()
        
        // console.log(firebaseService.user );

        
        const userRef = doc(db, "users", firebaseService.user.uid);
        onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            if (userData) {
                this.user.firstName = userData.firstName;
                this.user.lastName = userData.lastName;
                this.user.userProfilePic = userData.userProfilePic;

                this.editedUserDetails.firstName = userData.firstName;
                this.editedUserDetails.lastName = userData.lastName;
                this.editedUserDetails.userProfilePic = userData.userProfilePic;
            }
            // console.log(this.user.firstName);
        });
        // onAuthStateChanged(auth, (user) => {
        //     this.user = user;
        
        //     console.log(user);
        //     console.log(user.photoURL);
        // });
            // console.log(this.user.name);
            
            
            // this.$refs.nameinputprofile_ref.focus()
        },
        computed: {
        hasChanges() {
            return (
                this.editedUserDetails.firstName !== this.user.firstName ||
                this.editedUserDetails.lastName !== this.user.lastName ||
                this.editedUserDetails.userProfilePic !== this.user.userProfilePic
            );
        }
    },

    methods: {

        handleFileSelection(event) {
            const file = event.target.files[0];
            const maxSizeKB = 1024; // Maximum allowed file size in kilobytes
            
            if (file && file.size > maxSizeKB * 1024) {
                // File size exceeds the limit
                alert(`File size exceeds the limit of ${maxSizeKB} KB`);
                // this.$refs.userProfilePic.value = null; // Clear the file input field
                return;
            }

            // Check the file type and extension
            if (file && file.type !== "image/jpeg" && !file.name.toLowerCase().endsWith(".jpg")) {
                // Invalid file type or extension
                alert("Only JPG images are allowed");
                // this.$refs.userProfilePic.value = null; // Clear the file input field
                return;
            }

            // Continue with file processing and uploading
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const width = img.width;
                    const height = img.height;
                    const targetDimension = width; // Target dimension for width and height
                    if (width !== targetDimension || height !== targetDimension) {
                    alert("Image must be in square ratio, where width and height are same");
                    // this.$refs.userProfilePic.value = null; // Clear the file input field
                    return;
                    }

                    this.user.userProfilePic = reader.result;
                    this.editedUserDetails.userProfilePic = file;
                };
                img.src = reader.result;
                };
                reader.readAsDataURL(file);
            }
            },
            editedProfileSaveClicked(){
            this.isConfirmationModalVisible = true;
                
            },
            async cofirmedProfileSave(){
            // Get the updated user input values
            // const userProfilePicFile = this.$refs.userProfilePic.files[0];
            const userProfilePicFile = this.editedUserDetails.userProfilePic;
            const userFirstName = this.editedUserDetails.firstName;
            const userLastName = this.editedUserDetails.lastName;

            // Check if the values have changed
            const hasFirstNameChanged = userFirstName.trim() !== this.user.firstName.trim();
            const hasLastNameChanged = userLastName.trim() !== this.user.lastName.trim();
            const hasProfilePicChanged = userProfilePicFile !== this.user.userProfilePic;

            const userId = firebaseService.user.uid;
            // Perform the save functionality if any value has changed
            if (hasFirstNameChanged || hasLastNameChanged || hasProfilePicChanged) {
                try {
                    // Delete the previous profile picture if it exists
                    if (hasProfilePicChanged && this.user.userProfilePic) {
                        const prevStorageRef = ref(storage, `userProfilePictures/${userId}/profilepic.jpg`);

                        // Check if the previous profile picture exists
                        const prevProfilePicExists = await getDownloadURL(prevStorageRef)
                            .then(() => true)
                            .catch(() => false);

                        // Delete the previous profile picture if it exists
                        if (prevProfilePicExists) {
                            await deleteObject(prevStorageRef);
                        }
                    }

                    // Upload the profile picture to Firebase Storage if selected
                    let downloadURL = this.user.userProfilePic;
                    if (hasProfilePicChanged) {
                        const storageRef = ref(storage, `userProfilePictures/${userId}/profilepic.jpg`);
                        await uploadBytes(storageRef, userProfilePicFile);
                        downloadURL = await getDownloadURL(storageRef);
                    }

                    // Prepare the updated user data
                    const updatedUserData = {
                        firstName: hasFirstNameChanged ? userFirstName : this.user.firstName,
                        lastName: hasLastNameChanged ? userLastName : this.user.lastName,
                        userProfilePic: downloadURL
                    };

                    // Update the user document in Firestore with the updated data
                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, updatedUserData);

                    console.log('Profile details updated successfully');
                } catch (error) {
                    console.error('Error updating profile details:', error);
                }
            } else {
                console.log('No changes detected. Skipping profile update.');
            }

            // Close the confirmation modal
            this.isConfirmationModalVisible = false;
            // this.$refs.editprofilemodal_ref.close();
            this.$emit('closeEditprofileModalClicked')
        }
    

        
    
}}
</script>

<style>


.editprofilemodal::backdrop {
    /* position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.331);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center; */
}


.editprofilemodal {
    /* width: 60%; */
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border: none;
    border-radius: 2rem;
    padding: 5rem;
    margin: auto; */
}

.editProfileModal_pfp_edit_div {
    width: 10rem;
    position: relative;
}
.editProfileModal_pfp_preview_img{
    border-radius: 100%;
    width: 100%;
    padding: 1rem;
}


.editProfileModal_pfp_edit_div label {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 100%;
    cursor: pointer;
    padding: 0.4rem;
    user-select: none;
}
.editProfileModal_pfp_edit_div label:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);

}
.editProfileModal_pfp_edit_div input {
    display: none;
}

.editProfileModal_pfp_edit_div .material-icons {
  font-size: 24px; /* Adjust the font size as needed */
  color: #000; /* Adjust the color as needed */
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
    top: 1rem;
    right: 1rem;
}


.saveEditedDetailsButton{
    margin-top: 1rem;
}
.saveEditedDetailsButton:disabled{


    border-color: grey;
    background-color: transparent;
    cursor: default;
    color: grey;
}
</style>