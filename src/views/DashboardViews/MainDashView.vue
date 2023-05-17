<template>

<div class="dashboarddiv"  >

        <SideComp  :sideBarwidth="sidebarWidth" />
        
        <div class="statsappsdiv" :style="{ marginLeft: marginLeft + 'px' }">
            <OverallStats/>
        <AppsList></AppsList>
</div>


</div>
<DashFooter></DashFooter>




</template>

<script>

import SideComp from '../../components/DashboardComps/SideComp.vue';
import AppsList from '../../components/DashboardComps/AppsList.vue';
import OverallStats from '../../components/DashboardComps/OverallStats.vue';
import DashFooter from '../../components/DashboardComps/DashFooter.vue'


export default{
    components:{SideComp, AppsList, OverallStats, DashFooter},
    date(){
        return{
            sidebarWidth: 300,
        }
    }

}
</script>

<style>

.dashboarddiv{
    display: flex;
    padding: 1rem;
}

.statsappsdiv{
    padding: 1rem;
    flex-direction: row;
      flex-grow: 1;
  margin-left: 300px; /* Adjust the margin to accommodate the width of the left sidebar */
  overflow-y: auto;
  height: 1000vh;
}




</style>