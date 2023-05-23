<template>
    <div class="dashboarddiv" :class="{ unselectable: showprojectStats }">
        <SideComp :sideBarwidth="sidebarWidth" />
        <div class="statsprojectsdiv"
             :style="{ marginLeft: (sidebarWidth - ((90 / 100) * sidebarWidth)) + 'px' }">
                
            <template  v-if="showprojectStats">
                <projectStats @closeprojectStatsClicked="
                    this.showprojectStats = false"/>
            
            </template>
        <template v-else>

            <OverallStats />
            <projectsList @openprojectStatsClicked="onopenprojectStatsClicked($event)"/>
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
        onopenprojectStatsClicked(projectName) {
            this.showprojectStats = true
            console.log(this.showprojectStats);
            console.log('Selected project:', projectName);
        },
        closeprojectStats2() {
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

.unselectable{
    user-select: none;
}
</style>