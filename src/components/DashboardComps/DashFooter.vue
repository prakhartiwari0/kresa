<template>
    <footer class="dashfoot basic_flexbox">

        <div class="logodiv">
            <a href="/" target="_blank">
                <img src="../../assets/logos/kresa_light_transparent.png" class="dashfooter_logo" alt="">
            </a>
        </div>
<a href="https://github.com/prakhartiwari0/kresa" target="_blank" class="general_links contribute_link">Contribute to Kresa</a>
    </footer>
</template>

<script>
export default {

}

</script>

<style>

.dashfoot{
    width: 100%;
    flex-direction: row;
    margin-top: 1rem;
    justify-content: space-evenly;
    /* height: 5    rem; */
}
.logodiv{
    width: 10%;
}
.dashfooter_logo{
    opacity: 0.7;
    width: 100%;
}
.dashfooter_logo:hover{
    opacity: 1;
}

.contribute_link{
    opacity: 0.7;
    text-decoration: none;
}
.contribute_link:hover{
    opacity: 1;
}
</style>