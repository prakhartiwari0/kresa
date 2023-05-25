<template>
    <template v-if="showConfirmationPopup">
        <confirmationPopup :msg="confirmSignout"
                           @yesClicked="signoutConfirmed"
                           @noClicked="showConfirmationPopup = false" />
    </template>
    <div class="maindiv basic_flexbox"
         :style="dynamicStylesFromMainDashView">
        <div class="pfp_div basic_flexbox">
            <img :src="sideBarContent.mainTopImage"
                 alt="Your Profile Picture"
                 class="pfpimg">
        </div>
        <div class="profile_info_div basic_flexbox">
            <span class="sideBarContentFullName">
                {{ sideBarContent.fullName }}
            </span>
            <!-- <span class="sideBarContentGithub">{{ sideBarContentGithub }}</span> -->
        </div>
        <button @click="showEditProfileModal = true"
                class="editProfileButton actionbutton material-symbols-outlined">
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



import firebaseService from "@/firebase/firebaseService";

import { signOut } from "firebase/auth";



import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db, auth, storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



export default {
    components: { EditProfileModal, confirmationPopup },
    data() {
        return {
            showEditProfileModal: false,
            showConfirmationPopup: false,
            userID: firebaseService.user.uid,

            sideBarContent: {
                fullName: "",
                mainTopImage: "",
            },
            userProfileData: {
                fullName: "",
                mainTopImage: "",
            },
        }

    },
    props: {
        dynamicStylesFromMainDashView:{
            type: Object,
            required: true,
        },
        projectStatsOpened:{
            type: Boolean,
            required: true,
        },
        projectID:{
            type: String,
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

                // This will be be NOT updated
                this.userProfileData.fullName = `${userData.firstName} ${userData.lastName}`
                this.userProfileData.mainTopImage = userData.userProfilePic;
                
                // This will be updated
                this.sideBarContent.fullName = `${userData.firstName} ${userData.lastName}`
                this.sideBarContent.mainTopImage = userData.userProfilePic;
                
            }
        });
        
    },
    async updated(){
        if (this.projectStatsOpened) {
            console.log("Project Stats opened of ID", this.projectID);
            
            
            const projectRef = doc(db, "users", this.userID, "projects", this.projectID);
            const projectSnap = await getDoc(projectRef);
            let addedProjectData = projectSnap.data()
            
            
            console.log("Project Data", addedProjectData);
            this.sideBarContent.fullName = addedProjectData.projectName
            this.sideBarContent.mainTopImage = addedProjectData.projectLogo;
            
        }
        else{
            this.sideBarContent.fullName = this.userProfileData.fullName
            this.sideBarContent.mainTopImage = this.userProfileData.mainTopImage;
            console.log("Projects Stats Closed");
        }
        
    },
    methods: {
        signoutClicked() {
            console.log(firebaseService.sideBarContent);
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
.maindiv {
    box-shadow: 0px 7px 10px 0px black;
    width: var(--sidebar-width);
    margin-right: var(--sidebar-margin-right);
    position: sticky;
    top: 1rem;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    background-color: var(--light-k-blue);
    border-radius: 2rem;
    height: 90vh;

}

.pfp_div {
    margin: 1rem;
    width: 81%;
    padding: .5rem;
    border-radius: 100%;
}

.pfpimg {
    border-radius: 100%;
    width: 100%;
    box-shadow: 0px 7px 10px 0px black;

}

.profile_info_div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    width: 81%;
    flex-direction: column;
    color: white;
    padding: 0.8rem;
}

.profile_info_div .sideBarContentFullName {
    font-size: 1.5rem;
}

.editProfileButton {
    top: .5rem;
    right: .5rem;
    color: var(--light-lavender);
}

.editProfileButton:hover {}

.signoutLink {
    opacity: .7;
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    left: auto;
    right: auto;
    text-decoration: none;
    border-radius: 1rem;
    transition: .2s ease;
    color: var(--lightest-lavender);

    display: flex;
    justify-content: center;
    align-items: center;
}

.signoutLink,
.signoutLink span {
    font-size: 1rem;
}


.signoutLink span {
    margin-left: .3rem;
}

.signoutLink:hover {
    opacity: 1;
}</style>