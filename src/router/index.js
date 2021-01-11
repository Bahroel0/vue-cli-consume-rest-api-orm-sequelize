import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Company from '../views/Company.vue'
import Employee from '../views/Employee.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/company',
    name: 'Company',
    component: Company
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
