<template>
    <div class="dashboarddiv" :class="{ unselectable: showprojectStats }">
        <SideComp :sideBarwidth="sidebarWidth" />
        <div class="statsprojectsdiv"
             :style="{ marginLeft: (sidebarWidth - ((90 / 100) * sidebarWidth)) + 'px' }">
                
            <template  v-if="showprojectStats">
                <projectStats @closeprojectStats1="closeprojectStats2($event)"/>
            
            </template>
        <template v-else>

            <OverallStats />
            <projectsList @openprojectStats1="openprojectStats2($event)"/>
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


export default {
    components: { SideComp, projectsList, OverallStats, DashFooter, projectStats },
    data() {
        return {
            showprojectStats: false,
            sidebarWidth: 300,
        }
    },
    methods: {
        openprojectStats2(projectName) {
            this.showprojectStats = true,
            console.log(this.showprojectStats);
            console.log('Selected project:', projectName);
        },
        closeprojectStats2() {
            this.showprojectStats = false,
            console.log(this.showprojectStats);
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
  font-family: "Ysabeau";

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

.unselectable{
    user-select: none;
}
</style>