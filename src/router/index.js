import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import AdsPage from '@/views/AdsPage.vue'

const routes = [
  {
    path: '/',
    name: 'AdsPage',
    component: AdsPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
