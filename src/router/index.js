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
import Help from '../views/Help.vue'
// import About from '../views/About.vue'
import privacyPolicy from '../views/privacyPolicy.vue'
import termsConditions from '../views/termsConditions.vue'
import refundPolicy from '../views/refundPolicy.vue'
import Feedback from '../views/Feedback.vue'
import Recognition from '../views/Recognition.vue'
import CustomerVerified from '../views/CustomerVerified.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import ChangePassword from '../views/ChangePassword.vue'


import store from '../store'
Vue.use(VueRouter)


const routes = [
  // {
  //   path: '/welcome',
  //   name: 'Welcome',
  //   component: Welcome
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireLogin: true
    }
    
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About,
  //   meta: {
  //     requireLogin: true
  //   }
    
  // },
 
  {
    path: '/menu/:id',
    name: 'Menu',
    component: Menu,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/menu/qr/:id',
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
    path: '/privacy_policy',
    name: 'privacyPolicy',
    component: privacyPolicy,
  },
  {
    path: '/terms_and_conditions',
    name: 'termsConditions',
    component: termsConditions,
    
  },
  {
    path: '/refund_policy',
    name: 'refundPolicy',
    component: refundPolicy,

  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
  },
  {
    path: '/recognition',
    name: 'Recognition',
    component: Recognition,
  },
  {
    path:'/verify/:id',
    name:'CustomerVerified',
    component: CustomerVerified
  },
  {
    path:'/forget-password',
    name:'ForgetPassword',
    component: ForgetPassword
  },
  {
    path:'/forgetpassword/:id',
    name:'ChangePassword',
    component:ChangePassword
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }; 
    }
  },
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})();

export default router
