<template>

<div class="projectsarea">

    <div class="projectsheading">
        <h2>Your projects</h2>
    </div>
    <div class="projectslistdiv">
        
        <div class="projectdiv"
        @click="openprojectStats(project.projectname)"
        v-for="(project, index) in projects">
        <img :src="project.projecticonurl"
        :alt="project.projectname">
        <span>{{ project.projectname }}</span>
    </div>
    <div class="addprojectbuttondiv">
        <button 
        @click="openAddprojectModal"
        class="addprojectbutton material-symbols-outlined">add</button>
    </div>
        <AddprojectModal v-if="showAddprojectModal" @closeAddprojectModal1="closeAddprojectModal2($event)"/>  
    </div>
</div>
</template>

<script>
import AddprojectModal from './AddprojectModal.vue';

export default {
    components: { AddprojectModal },
    data() {
        return {
            showAddprojectModal: false,

            projects: [
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    projectname: "Arito",
                    projecticonurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
            ]
        }
    },
    methods: {
        openprojectStats(projectName) {
            this.$emit('openprojectStats1', projectName);
        },
        openAddprojectModal(){
            this.showAddprojectModal = true
        },
        closeAddprojectModal2() {
            this.showAddprojectModal = false,
                console.log(this.showprojectStats);
        }
    }


}

</script>

<style>
.projectsarea{
    padding: 1em;

}

.projectsheading{

}



.projectslistdiv {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    grid-gap: 1rem;
    position: relative;
    justify-items: center;
    align-items: center;
    flex-grow: 1;
    margin-block: 1rem;

}

.projectdiv {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5rem;
    margin-inline: 2rem;
    transition: 0.2s ease;

    padding: 0.7rem;
    border-radius: 1rem;

}

.projectdiv:hover {
    /* transform: scale(1.1); */
    background-color: rgba(0, 0, 0, 0.252);
}

.projectdiv img {
    width: 100%;
}



.addprojectbuttondiv {
    
    display: flex;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    position: absolute;
    bottom: 0rem;
    right: 0rem;
    margin: 1rem;
}

.addprojectbutton {

    background-color: var(--lavender);
    color: var(--k-blue);
    outline: none;
    border: none;
    user-select: none;
    cursor: pointer;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    border: 2px solid var(--k-blue);
    transition: 0.2s ease;
}

.addprojectbutton:hover {
    border: 2px solid var(--k-blue);
    background-color: var(--k-blue);
    color: white;


}
</style>