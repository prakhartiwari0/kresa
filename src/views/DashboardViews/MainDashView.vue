<template>
    <div class="dashboarddiv">

        <SideComp :sideBarwidth="sidebarWidth" />
        <div class="statsappsdiv" :style="{ marginLeft: (sidebarWidth-((90/100)*sidebarWidth)) + 'px' }">
            
            <StatsAppsArea/>
            <OverallStats />
            <AppsList/>
                        
        </div>

    </div>
    <DashFooter></DashFooter>
</template>

<script>

import SideComp from '../../components/DashboardComps/SideComp.vue';
import AppsList from '../../components/DashboardComps/AppsList.vue';
import OverallStats from '../../components/DashboardComps/OverallStats.vue';
import DashFooter from '../../components/DashboardComps/DashFooter.vue'
import StatsAppsArea from '../../components/DashboardComps/StatsAppsArea.vue'


export default {
    components: { SideComp, AppsList, OverallStats, DashFooter, StatsAppsArea },
    data() {
        return {
            sidebarWidth: 300,
        }
    }

}
</script>

<style>
.dashboarddiv {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
}

.statsappsdiv {
    padding: 2rem;
    padding-top: 0;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    
    
    display: flex;
    flex-direction: column;
}
</style>