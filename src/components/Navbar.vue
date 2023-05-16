<template>
    <nav class="navbar_div basic_flexbox">
        <div class="basic_flexbox nav_kresa">
            <img src="../assets/logos/kresa_dark_cropped_transparent.svg" alt="kresa_logo" class="nav_logoimage">
        </div>
        <div class="basic_flexbox">
            <router-link :to="link[2]" :title="link[0]" class="navlinks" v-for="(link, index) in navlinks">
                {{ link[1] }}

            </router-link>
        </div>
    </nav>
</template>

<script>
export default{
    data(){
        return{
            navlinks: [
                ["Home","🛖", "/"],
                ["How Kresa Works?","🤔", "howitworks"],
                ["Get Started","🔥", "getstarted"]]
        }
    }

}



</script>

<style>

/* NAVBAR */

.navbar_div{
    user-select: none;
    justify-content: space-between; 
    width: 100%;
}

.nav_kresa{
    user-select: none;
    padding: 2rem;
    display: flex;
    justify-content: left;
}

.nav_logoimage{
    opacity: 0.95;
    width: 10rem;
}
.nav_logoimage:hover{
    cursor: pointer;
    opacity: 1;
}
.navlinks{
    text-decoration: none;
    font-size: 2rem;
    color: var(--k-blue);
    font-family: Ysabeau;
    margin: 1rem;
    transition: 0.3s ease;
    padding: 1rem;
    border-bottom: 2px solid var(--light-lavender);
    border-top: 2px solid var(--light-lavender);
    outline: none;
    transform: scale(0.8);
    opacity: 0.7;
}

.router-link-exact-active{
    opacity: 1;
    transform: scale(1.2);
    
}
.navlinks:hover{
    opacity: 1;
}


</style>