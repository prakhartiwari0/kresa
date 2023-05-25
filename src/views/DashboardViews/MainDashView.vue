<template>
    <div class="dashboarddiv">
        <SideComp :dynamicStylesFromMainDashView="sideCompStyles"
        :projectStatsOpened="this.showprojectStats" :projectID="openedProjectID"

       />
        <div class="statsprojectsdiv">
                
            <template  v-if="showprojectStats">
                <projectStats @closeprojectStatsClicked="
                    this.showprojectStats = false"/>
            
            </template>
        <template v-else>

            <OverallStats />
            <projectsList @openprojectStatsClicked="onOpenProjectStatsClicked($event)"/>
        </template>
    
        </div>
    </div>
    <DashFooter></DashFooter>
</template>


<script>

import SideComp from '../../components/DashboardComps/SideComp.vue';
import projectsList from '../../components/DashboardComps/projectsList.vue';
import OverallStats from '../../components/DashboardComps/OverallStats.vue';
import DashFooter from '../../components/DashboardComps/DashFooter.vue'
import projectStats from '../../components/DashboardComps/projectStats.vue'



import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import firebaseService from "@/firebase/firebaseService";


export default {
    components: { SideComp, projectsList, OverallStats, DashFooter, projectStats },
    data() {
        return {
            showprojectStats: false,
            userID: firebaseService.user.uid,
            openedProjectID: null,
        }
    },
    computed: {
        async sideCompProperties(projectID = null){
            
            let sideBarContent = {
                mainTopImage: "",
                completeName: "",
            }
            if (this.showprojectStats === false) {
                const userRef = doc(db, "users", firebaseService.user.uid);
                onSnapshot(userRef, (snapshot) => {
                    const userData = snapshot.data();
                    if (userData) {
                        sideBarContent.completeName = `${userData.firstName} ${userData.lastName}`
                        sideBarContent.mainTopImage = userData.userProfilePic;
                    }
                });
            }
            else{
                const projectRef = doc(db, "users", this.userID, "projects", projectID);
                const projectSnap = await getDoc(projectRef);
                let addedProjectData = projectSnap.data()
        
                sideBarContent.completeName = addedProjectData.projectName
                sideBarContent.mainTopImage = addedProjectData.projectLogo
        
        
            }
        
            return sideBarContent
        },  
        sideCompStyles() {
            const sidebarWidth = 300; // Set a default value if sidebarWidth is not available yet
            return {
                "--sidebar-width": `${sidebarWidth}px`,
                "--sidebar-margin-right": `${(sidebarWidth - (90 / 100) * sidebarWidth)}px`,
            };
        },
    },
    methods: {
        onOpenProjectStatsClicked(projectID) {
            this.showprojectStats = true
            this.openedProjectID = projectID
            // this.loadSideBarContent(projectID)
            console.log('Selected project:', this.openedProjectID);
        }
    }

}
</script>

<style>
.dashboarddiv {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  font-family: var(--default-font);

}

.statsprojectsdiv {
    padding: 2rem;
    padding-top: 0;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    
    
    display: flex;
    flex-direction: column;
}

</style>