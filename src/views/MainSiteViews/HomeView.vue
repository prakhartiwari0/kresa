
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
import { auth, provider } from '@/firebase/firebase';




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
                    console.log(user);

                    // Close the GitHub Login Popup
                    this.LogSignPopupVisible = false

                    this.$router.push('/dashboard'); // Redirect to the root page

                    
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