import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminPanel from '../views/AdminLogin.vue'
import MakeEntry from '../views/MakeEntry.vue'
import Login from '../components/user/Login.vue'
import ReceivedList from '../views/ReceivedList.vue'
import Donate from '../views/Donate.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  },
    {
      path: '/entry/:id',
    name: 'Entry',
    component: MakeEntry
  },
  {
    path: '/list',
  name: 'List',
  component: ReceivedList
},
  {
    path: '/auth',
  name: 'Login',
  component: Login
},
{
  path: '/donate',
name: 'Donate',
component: Donate
},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
