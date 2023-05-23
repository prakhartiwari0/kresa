<template>
    <div class="projectstatsdiv">

        <button 
        @click="$emit('closeprojectStatsClicked')"
        class="backtodashboardbutton actionbutton material-symbols-outlined">arrow_back</button>
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

}
.backtodashboardbutton:hover{
}

</style>