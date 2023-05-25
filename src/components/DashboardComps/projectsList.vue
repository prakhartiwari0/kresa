<template>

<div class="projectsarea">

    <div class="projectsheading">
        <h2>Your projects</h2>
    </div>
    <div class="addprojectbuttondiv">
        <button 
        @click="openAddprojectModalClicked"
        class="addprojectbutton material-symbols-outlined">add</button>
    </div>
    <div class="projectslistdiv">
        
        <div class="projectdiv"
        v-for="(project, index) in projects"
        @click="openProjectStatsClicked(project.dataAttributeProjectId)"
        :data-projectid="project.dataAttributeProjectId"
        >
        <img :src="project.logo"
        :alt="project.name">
        <span>{{ project.name }}</span>
    </div>
        <AddprojectModal 
        @projectAdded="newProjectAdded"
        v-if="showAddprojectModal" @closeAddprojectModalClicked="showAddprojectModal = false"/>  
    </div>
</div>
</template>

<script>

import firebaseService from "@/firebase/firebaseService";


import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, auth, storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


import AddprojectModal from './AddprojectModal.vue';

export default {
    components: { AddprojectModal },
    data() {
        return {
            showAddprojectModal: false,
            userID: firebaseService.user.uid,
            projects: [
                // {
                //     name: "Arito",
                //     logo: "../../../src/assets/examplefiles/Arito_icon.png",
                //     dataAttributeProjectId: null,
                // },
            ]
        }
    },
    mounted(){
        this.loadProjects()
    },
    methods: {
        // openprojectStatsClicked(projectName) {
        //     this.;
        // },
        openAddprojectModalClicked(){
            this.showAddprojectModal = true
        },
        async loadProjects(){
            const projectsRef = collection(db, "users", this.userID, "projects");
            const projectSnapshot = await getDocs(projectsRef);

            projectSnapshot.forEach((doc) => {
                const projectData = doc.data();
                // console.log(projectData);
                const projectDetailsObject = {
                    name: projectData.projectName,
                    logo: projectData.projectLogo,
                    dataAttributeProjectId: projectData.dataAttributeProjectId
                };
                this.projects.push(projectDetailsObject);
            });
        },
        async loadNewProject(projectID){
            const projectRef = doc(db, "users", this.userID, "projects", projectID);
            const projectSnap = await getDoc(projectRef);
            let addedProjectData = projectSnap.data()

            let addedProjectDetailsObject = {
                name: addedProjectData.projectName,
                logo: addedProjectData.projectLogo,
                dataAttributeProjectId: addedProjectData.dataAttributeProjectId
            }

            this.projects.push(addedProjectDetailsObject)

        },
        async newProjectAdded(projectID){
            // const newProjectRef = collection(db, "users", userID, "projects");
            console.log("Project has been added, the id is:",projectID);

            await this.loadNewProject(projectID);
        },
        openProjectStatsClicked(projectID){
            this.$emit('openprojectStatsClicked', projectID)
        }

    },


}

</script>

<style>
.projectsarea{
    padding: 1em;
    /* box-shadow: 0px 2px 7px 0px black; */

    border-radius: 1rem;
    margin-top: 2rem;
    /* background: rgb(204,204,255); */
    /* background: linear-gradient(0deg, rgba(204,204,255,1) 0%, rgba(242,242,252,1) 100%); */
    background-color: var(--lighter-lavender);
    position: relative;
}

.projectsheading{
    text-align: center;

}

.projectslistdiv {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    grid-gap: .5rem;
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
    font-weight: 700;
    padding: 0.7rem;
    border-radius: 1rem;

}

.projectdiv:hover {
    transform: scale(1.1);
    color: white;
    background-color: hsl(var(--kblueHue), var(--kblueSaturation), var(--kblueLightness), 0.7);
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
    bottom: 1rem;
    right: 1rem;
}

.addprojectbutton {
    padding: .5rem;
    /* background-color: var(--lightest-lavender); */
    background-color: transparent;
    color: var(--k-blue);
    outline: none;
    border: none;
    user-select: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition: 0.2s ease;
    border-radius: 100%;
    border: 2px solid var(--k-blue);
}

.addprojectbutton:hover {
    background-color: var(--k-blue);
    box-shadow: 0px 0px 5px 0px black;

    color: white;


}
</style>