<template>
    <template v-if="showConfirmationPopup">
        <confirmationPopup :msg="confirmSignout"
                           @yesClicked="signoutConfirmed"
                           @noClicked="showConfirmationPopup = false" />
    </template>
    <div class="maindiv basic_flexbox"
         :style="{ width: sideBarwidth + 'px' }">
        <div class="pfp_div basic_flexbox">
            <img :src="user.userProfilePic"
                 alt="Your Profile Picture"
                 class="pfpimg">
        </div>
        <div class="profile_info_div basic_flexbox">
            <span class="userFullName">
                {{ user.firstName }} {{ user.lastName }}
            </span>
            <!-- <span class="userGithub">{{ userGithub }}</span> -->
        </div>
        <button @click="showEditProfileModal = true"
        <button 
        @click="showEditProfileModal = true"
        class="editProfileButton material-symbols-outlined">
            edit
        </button>


        <a href="#"
           class="signoutLink"
           @click.prevent="signoutClicked">
            Sign Out
            <span class=" material-symbols-outlined">logout</span>
        </a>
    </div>

    <template v-if="showEditProfileModal">
        <EditProfileModal @closeEditprofileModalClicked="showEditProfileModal = !showEditProfileModal"></EditProfileModal>
    </template>
</template>

<script>
import EditProfileModal from './EditProfileModal.vue'
import confirmationPopup from './confirmationPopup.vue';



import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import firebaseService from "@/firebase/firebaseService";


export default {
    components: { EditProfileModal, confirmationPopup },
    data() {
        return {
            showEditProfileModal: false,
            showConfirmationPopup: false,

            user: {
                firstName: "",
                lastName: "",
                userProfilePic: "",
            },
        }

    },
    props: {
        sideBarwidth: {
            type: Number,
            required: true,
        }
    },
    computed: {
        confirmSignout() {
            return `Are you sure you want to sign out?`;
        },

    },
    mounted() {
        const userRef = doc(db, "users", firebaseService.user.uid);
        onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            if (userData) {
                this.user.firstName = userData.firstName;
                this.user.lastName = userData.lastName;
                this.user.userProfilePic = userData.userProfilePic;
            }
        });

    },
    methods: {
        signoutClicked() {
            console.log(firebaseService.user);
            this.showConfirmationPopup = true;
        },
        signoutConfirmed() {
            this.showconfirmSignoutPopup = false

            signOut(auth)
                .then(() => {
                    // Successful sign-out
                    this.$router.push('/'); // Redirect to the root page
                })
                .catch((error) => {
                    // Handle sign-out error
                });
        }
    }
}

</script>

<style>


.maindiv{
  /* border: 2px solid black; */
  /* box-shadow: 0px 0px 7px 1px black; */
    box-shadow: 0px 10px 20px 0px black;

  position: sticky;
  top: 1rem;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background: rgb(16,99,148);
background: linear-gradient(0deg, rgba(16,99,148,1) 0%, rgba(16,99,148,1) 25%, rgba(64,139,184,1) 50%, rgba(99,169,210,1) 75%, rgba(116,183,222,1) 89%, rgba(132,196,234,1) 100%);
  border-radius: 2rem;
  height: 90vh;

}

.pfp_div{
    margin: 1rem;
    width: 81%;
    padding: .5rem;
    border-radius: 100%;
    /* background-color: var(--k-blue); */
}
.pfpimg{
    border-radius: 100%;
    width: 100%;
    /* box-shadow: 0px 0px 10px 1px black; */
    box-shadow: 0px 10px 20px 0px black;

}

.profile_info_div{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    width: 81%;
    /* margin: 1rem; */
    flex-direction: column;
    color: white;
    padding: 0.8rem;
}
.profile_info_div .userFullName{
    font-size: 1.5rem;
}

.editProfileButton{
    position: absolute;
    top: .5rem;
    right: .5rem;
    background-color: transparent;
    border: none;
    border-radius: 100%;
    padding: .5rem;
    cursor: pointer;
    color: white;
    
}
.editProfileButton:hover{
    background-color: rgba(0, 0, 0, 0.25);
    
}
.signoutLink{
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    text-decoration: none;
    border-radius: 1rem;
    padding: .5rem;
    color: rgba(255, 255, 255, 0.5);
    
    display: flex;
    justify-content: center;
}
.signoutLink span{
    margin-left: .3rem;
}
.signoutLink:hover{
    color: rgba(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
}

</style>