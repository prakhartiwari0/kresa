<template>
    <div class="projectstatsdiv">

        <button 
        @click="closeprojectStats()"
        class="backtodashboardbutton material-symbols-outlined">arrow_back</button>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem.</p>
        
    </div>


</template>

<script>

export default{
    data(){
        return{

        }
    },
    created(){
        console.log("Hellloo");

    },    
    methods: {
        closeprojectStats() {
            this.$emit('closeprojectStats1');
        }
}
}


</script>

<style>
.projectstatsdiv{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    /* height: 100%; */
}





.backtodashboardbutton{
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    color: rgba(128, 128, 128, 0.786);
    cursor: pointer;
    border-radius: 100%;
    border: none;
    
}
.backtodashboardbutton:hover{
    background-color: rgba(128, 128, 128, 0.127);
}

</style>