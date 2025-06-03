import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import BarterPage from '@/views/BarterPage.vue'
import CreateAdPage from '@/views/CreateAdPage.vue'
import EditAdPage from '@/views/EditAdPage.vue'

const routes = [
  {
    path: '/',
    name: 'BarterPage',
    component: BarterPage,
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
    path: '/edit-ad/:id?',
    name: 'EditAdPage',
    component: EditAdPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
