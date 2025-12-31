import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import DashBoard from '../views/DashBoard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
