import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Order from '../views/OrderDetail.vue'
import Welcome from '../views/welcomePage.vue'

import store from '../store'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requireLogin: true
    }
  },
 
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      requireLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/welcome')
  } else {
    next()
  }
})

export default router
