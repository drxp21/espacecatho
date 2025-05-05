import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // fallback
    return savedPosition || { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),

    },
    {
      path: '/articles/:id',
      name: 'article',
      component: () => import('../views/Article.vue'),

    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/Inscription.vue'),
    }
  ],
})

export default router
