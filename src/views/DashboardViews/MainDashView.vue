<template>
    <div class="dashboarddiv" :class="{ unselectable: showAppStats }">
        <SideComp :sideBarwidth="sidebarWidth" />
        <div class="statsappsdiv"
             :style="{ marginLeft: (sidebarWidth - ((90 / 100) * sidebarWidth)) + 'px' }">
                
            <template  v-if="showAppStats">
                <AppStats @closeAppStats1="closeAppStats2($event)"/>
            
            </template>
        <template v-else>

            <OverallStats />
            <AppsList @openAppStats1="openAppStats2($event)"/>
        </template>
    
        </div>
    </div>
    <DashFooter></DashFooter>
</template>


<script>

import SideComp from '../../components/DashboardComps/SideComp.vue';
import AppsList from '../../components/DashboardComps/AppsList.vue';
import OverallStats from '../../components/DashboardComps/OverallStats.vue';
import DashFooter from '../../components/DashboardComps/DashFooter.vue'
import AppStats from '../../components/DashboardComps/AppStats.vue'


export default {
    components: { SideComp, AppsList, OverallStats, DashFooter, AppStats },
    data() {
        return {
            showAppStats: false,
            sidebarWidth: 300,
        }
    },
    methods: {
        openAppStats2(appName) {
            this.showAppStats = true,
            console.log(this.showAppStats);
            console.log('Selected app:', appName);
        },
        closeAppStats2() {
            this.showAppStats = false,
            console.log(this.showAppStats);
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

.statsappsdiv {
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