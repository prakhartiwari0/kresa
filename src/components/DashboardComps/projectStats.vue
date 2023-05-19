<template>
    <div class="projectstatsdiv">

        <button 
        @click="$emit('closeprojectStatsClicked')"
        class="backtodashboardbutton material-symbols-outlined">arrow_back</button>
        Very good project stats
        
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