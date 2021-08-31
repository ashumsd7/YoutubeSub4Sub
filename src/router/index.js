import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminPanel from '../views/AdminLogin.vue'
import MakeEntry from '../views/MakeEntry.vue'
import ReceivedList from '../views/ReceivedList.vue'

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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
