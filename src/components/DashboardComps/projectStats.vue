<template>
    
    <button 
    @click="$emit('closeprojectStatsClicked')"
    class="backtodashboardbutton actionbutton material-symbols-outlined">arrow_back</button>
    <div class="projectstatsdiv">
        
        <h2>{{ projectData.projectName }} Statistics</h2>
        
        
        
        <button 
        @click="showProjectSettings = !showProjectSettings"
        class="openSettingsButton actionbutton material-symbols-outlined">settings</button>
    </div>
    
    <template v-if="showProjectSettings">
        <projectSettingsModal 
        @closeprojectSettingsModalClicked="showProjectSettings = !showProjectSettings"
        :projectData="projectData"
        />
    </template>

    


</template>

<script>

import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db, auth, storage } from "@/firebase/firebase";

import projectSettingsModal from "./projectSettingsModal.vue";



export default{
    components:{ projectSettingsModal },
    data(){
        return{
            projectData:{

            },

            showProjectSettings: false,

        }
    },
    props:{
        projectID:{
            type: String,
            required: true
        },
        userID:{
            type: String,
            required: true
        }   
    },
    async created(){


        const projectRef = doc(db, "users", this.userID, "projects", this.projectID);
        const projectSnap = await getDoc(projectRef);
        // let fetchedProjectData = projectSnap.data()
        this.projectData = projectSnap.data()


        // console.log(fetchedProjectData);

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
    margin: 1rem;
    background-color: var(--lighter-lavender);
    padding: 2rem;
    border-radius: 2rem;

    position: relative;
}

.backtodashboardbutton{
left: 0;
top: 0;
}
.openSettingsButton{
    right: 1rem;
    bottom: 1rem;
    font-size: 2rem;
    color: var(--k-blue);
    padding: 0rem;
    width: auto;
    height: auto;
    transition: transform .2s ease; /* Added transition property */
    
}
.openSettingsButton:hover{
    background-color: transparent;
    transform: rotate(60deg);
}
.openSettingsButton:active{
    color: var(--darkest-k-blue);

}

</style>