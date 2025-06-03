import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import AdsPage from '@/views/AdsPage.vue'
import CreateAdPage from '@/views/CreateAdPage.vue'
import EditAdPage from '@/views/EditAdPage.vue'

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
  {
    path: '/create-ad',
    name: 'CreateAdPage',
    component: CreateAdPage,
  },
  {
    path: '/edit-ad',
    name: 'EditAdPage',
    component: EditAdPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
