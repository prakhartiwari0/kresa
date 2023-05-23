
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


import { getFirestore, doc, setDoc } from "firebase/firestore";



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
            this.user = user;
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
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                    // console.log(user);
                          // Separate the displayName into firstName and lastName
                    const displayName = user.displayName;
                    const nameParts = displayName.split(" ");
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(" ");
                    // Close the GitHub Login Popup
                    this.LogSignPopupVisible = false
                        // Create a document in the "users" collection with the user's data
                    // const db = getFirestore();
                    const userRef = doc(db, "users", user.uid);

                    setDoc(userRef, {
                        // displayName: user.displayName,
                        firstName: firstName,
                        lastName: lastName,
                        email: user.email,
                        // githubUsername: user.reloadUserInfo.screenname,
                        // Other user data you want to store
                        userProfilePic: user.photoURL
                    })
                        .then(() => {
                            // Document created successfully
                            console.log("User document created in Firestore");

                            // Redirect to the root page or update the logic based on your requirements
                            // this.$router.push('/dashboard'); // Redirect to the root page
                            this.$router.push("/dashboard");
                        })
                        .catch((error) => {
                            // Handle any errors that occur during document creation
                            console.error("Error creating user document:", error);
                        });


                    
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GithubAuthProvider.credentialFromError(error);
                    // ...
                })
        },


    }
}

</script>


<style>

</style>