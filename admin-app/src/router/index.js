import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Area from '../views/Area.vue'
import Elders from '../views/Elders.vue'
import Volunteers from '../views/Volunteers.vue'
import Village from '../views/Village.vue'
import MemberVillage from '../views/MemberVillage.vue'
import ElderDetail from '../views/ElderDetail.vue'
import VolunteerDetail from '../views/VolunteerDetail.vue'
import About from '../views/about.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/area',
    name: 'area',
    component: Area
  },
  {
    path: '/area/:areaId/village',
    name: 'village',
    component: Village
  },
  {
    path: '/area/:areaId/village/:villId/member',
    name: 'vilage-member',
    component: MemberVillage
  },
  {
    path: '/elders',
    name: 'elders',
    component: Elders
  },
  {
    path: '/elder/:elderId',
    name: 'elder-detail',
    component: ElderDetail
  },
  {
    path: '/volunteers',
    name: 'volunteers',
    component: Volunteers
  },
  {
    path: '/volunteer/:volunteerId',
    name: 'volunteer-detail',
    component: VolunteerDetail
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
