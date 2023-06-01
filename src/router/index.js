import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainSiteViews/HomeView.vue'
// import MainDashView from '../views/DashboardViews/MainDashView.vue'


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
      // component: MainDashView,

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardViews/MainDashView.vue'),

      meta: { title: 'Kresa Dashboard' },
      beforeEnter: (to, from, next) => {
        AuthGuard.init()
        .then(() => {
          document.title = to.meta.title || 'Kresa - Get Feedback & Rating for Web Projects';
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
