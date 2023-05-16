import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainSiteViews/HomeView.vue'
import HowitworksView from '../views/MainSiteViews/HowitworksView.vue'

import MainDashView from '../views/DashboardViews/MainDashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/howitworks',
      name: 'howitworks',
      component: HowitworksView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MainDashView
    },
  ]
})

export default router
