import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainSiteViews/HomeView.vue'
import MainDashView from '../views/DashboardViews/MainDashView.vue'


import AuthGuard from "../firebase/AuthGaurd";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MainDashView,
      beforeEnter: (to, from, next) => {
        AuthGuard.init()
          .then(() => {
            // User is authenticated, allow access to the route
            next();
          })
          .catch((error) => {
            // User is not authenticated, redirect to the homepage
            console.error(error);
            next("/");
          });
      },
    },
  ]
})


export default router
