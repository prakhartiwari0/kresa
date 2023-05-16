<template>

<SideComp></SideComp>
<OverallStats></OverallStats>
<AppsList></AppsList>
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

        }
    }

}
</script>

<style>

</style>