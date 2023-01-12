import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Order from '../views/OrderDetail.vue'
import Welcome from '../views/welcomePage.vue'
import History from '../views/History.vue'
import Profile from '../views/Profile.vue'
import LikedShop from '../views/LikedShop.vue'
import SearchPage from '../views/SearchPage.vue'
import Wallet from '../views/Wallet.vue'

import store from '../store'
Vue.use(VueRouter)


const routes = [
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/',
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
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/likedshop',
    name: 'LikedShop',
    component: LikedShop,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet,
    meta: {
      requireLogin: true
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})();

export default router
