<template>


    <nav class="navbar_div basic_flexbox">
        <div class="basic_flexbox nav_kresa">
            <img src="../../assets/logos/kresa_dark_cropped_transparent.svg"
            alt="kresa_logo"
            class="nav_logoimage">
        </div>
        
        <div class="basic_flexbox navlinks_div">            
            <a href="#" class="navlinks">
                <img src="../../assets/home.svg" title="Home" alt="home" class="" @click="$emit('pageChange', 'home')">
            </a>
            <a href="#" class="navlinks">
                <img src="../../assets/howitworks.svg" title="How Kresa Works?" alt="howitworks" class="" @click="$emit('pageChange', 'howitworks')">
                
            </a>
            <template v-if="user" class="navlinks">
                <router-link to="dashboard" class="navlinks" title="Dashboard">
                    <img :src="userProfilePic" alt="profile_pic" class="profile_picture">
                </router-link>
            </template>
            <template v-else>
                <a href="#" class="navlinks" title="Get Started"  @click="LogSignPopupClicked">
                    <img src="../../assets/getstarted.svg" alt="getstarted">
                </a>
        </template>
        </div>
    </nav>
</template>

<script>

import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '@/firebase/firebase';
import { doc, onSnapshot } from "firebase/firestore";



export default {
    data() {
        return {
            iconsdir: "",
            navlinks: [
                ["Home", "../../assets/home.svg", 'home'],
                ["How Kresa Works?", "../../assets/howitworks.svg", "howitoworks"],
            ],
            ifnotloggedin: ["Get Started", "../../assets/getstarted.svg"],
            user: null,

            userProfilePic: "",
        }
    },
    methods: {
        LogSignPopupClicked() {
            this.$emit('onShowLogSignPopup')
        },

    }, 
    mounted() {
        onAuthStateChanged(auth, (user) => {
            this.user = user;
            // console.log(user);
            // console.log(db);
        const userRef = doc(db, "users", this.user.uid);
        onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            if (userData) {
                this.userProfilePic = userData.userProfilePic;
            }
            // console.log(this.user.firstName);
        });
        });
    },

}



</script>

<style>
.navbar_div {
    user-select: none;
    justify-content: space-between;
    width: 100%;
}

.nav_kresa {
    user-select: none;
    padding: 2rem;
    display: flex;
    justify-content: left;
}

.nav_logoimage {
    opacity: 0.95;
    width: 10rem;
}

.nav_logoimage:hover {
    cursor: pointer;
    opacity: 1;

}

.navlinks_div{
    margin-right: 1rem;
}

.navlinks {
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    text-decoration: none;
    font-size: 2.5rem;
    color: var(--k-blue);
    font-family: var(--default-font);
    margin: 1rem;
    transition: 0.3s ease;
    padding: 1rem;
    outline: none;
    opacity: 0.7;
}

/* .router-link-exact-active {
    opacity: 1;
    transform: scale(1.2);
    
} */

.navlinks:not(.router-link-exact-active):hover {
    opacity: 1;
    transform: scale(1);
}


.profile_picture {
    width: 3rem;
    border-radius: 100%;
}
</style>