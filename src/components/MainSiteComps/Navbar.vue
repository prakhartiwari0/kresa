<template>
    <nav class="navbar_div basic_flexbox">
        <div class="basic_flexbox nav_kresa">
            <img src="../../assets/logos/kresa_dark_cropped_transparent.svg"
                 alt="kresa_logo"
                 class="nav_logoimage">
        </div>
        <div class="basic_flexbox navlinks_div">
            <a @click="$emit('pageChange', link[2])" 
            :ref="link[2]"
            :title="link[0]"
                         class="navlinks"
                         v-for="(link, index) in navlinks">
            <img :src="iconsdir+link[1]+'.svg'" alt="" class="navlinks">
            </a>
            <template v-if="user" class="navlinks">

                <router-link to="dashboard" class="navlinks" title="Dashboard">
                    <img :src="user.photoURL" alt="profile_pic" class="profile_picture">
                </router-link>
            </template>
            <template v-else>
                <a href="#" :title="ifnotloggedin[0]"  class="navlinks"  @click="LogSignPopupClicked">
                    {{ ifnotloggedin[1] }}
                </a>
            </template>
        </div>
    </nav>
</template>

<script>

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase/firebase';
export default {
    data() {
        return {
            iconsdir: 'src/assets/icons/',
            navlinks: [
                ["Home", "home", 'home'],
                ["How Kresa Works?", "howitworks", "howitoworks"],
            ],
            ifnotloggedin: ["Get Started", "getstarted"],
            user: null,
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
            console.log(user);
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
    font-family: Ysabeau;
    margin: .5rem;
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