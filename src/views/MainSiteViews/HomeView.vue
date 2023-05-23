
<template>

<Navbar 
@pageChange="(pageName) =>  currentPage = pageName"


@onShowLogSignPopup="showLogSignPopup($event)"
>
</Navbar>


    <LoginSignupPopup v-if="LogSignPopupVisible"
    @signInWithGitHubClick="signInWithGitHub"
    @closeLoginSignupPopupClicked="closeLoginSignupPopup($event)"/>




    <HomeFirstSection v-if="currentPage==='home'"></HomeFirstSection>
    <HowitworksPage v-if="currentPage==='howitworks'"></HowitworksPage>



<Footer></Footer>

</template>



<script>
import Navbar from '../../components/MainSiteComps/Navbar.vue';
import Footer from '../../components/MainSiteComps/Footer.vue';
import HomeFirstSection from '../../components/MainSiteComps/HomeFirstSection.vue';
import HowitworksPage from '../../components/MainSiteComps/HowitworksPage.vue';
import LoginSignupPopup from '../../components/MainSiteComps/LoginSignupPopup.vue';


import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, provider, db } from '@/firebase/firebase';


import { getFirestore, doc, getDoc,setDoc } from "firebase/firestore";



export default {
    data(){
        return{
            currentPage: 'home',
            LogSignPopupVisible: false,
            user: null,
        }

    },
    components: {
        Navbar, Footer, HomeFirstSection, HowitworksPage, LoginSignupPopup
    },
    mounted(){

        auth.onAuthStateChanged((user) => {
            console.log(user);
        });
    },
    
    methods:{
        onhomepageClick(){
            
            this.currentPage = 'home'
        },
        onhowitoworkspageClick(){
            this.currentPage = 'howitoworks'

        },


        showLogSignPopup() {
            this.LogSignPopupVisible = true
        },
        closeLoginSignupPopup() {
            this.LogSignPopupVisible = false
        },
        
        signInWithGitHub() {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    const userRef = doc(db, "users", user.uid);

                    // Check if the user document exists
                    getDoc(userRef)
                        .then((docSnapshot) => {
                            if (docSnapshot.exists()) {
                                console.log("User already exists, logging in...");
                                this.LogSignPopupVisible = false;
                                this.$router.push("/dashboard"); // Redirect to the dashboard or desired page
                            } else {
                                const displayName = user.displayName;
                                const nameParts = displayName.split(" ");
                                const firstName = nameParts[0];
                                const lastName = nameParts.slice(1).join(" ");

                                // Create a new document with user data
                                setDoc(userRef, {
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: user.email,
                                    userProfilePic: user.photoURL
                                })
                                    .then(() => {
                                        console.log("User document created in Firestore");
                                        this.LogSignPopupVisible = false;
                                        this.$router.push("/dashboard"); // Redirect to the dashboard or desired page
                                    })
                                    .catch((error) => {
                                        console.error("Error creating user document:", error);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error("Error checking user document:", error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    const email = error.email;
                    const credential = GithubAuthProvider.credentialFromError(error);
                });
            },

    }
}

</script>


<style>

</style>