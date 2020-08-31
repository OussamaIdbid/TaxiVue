import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/FareCalculationResult/{map_url}/{startAddress}/{endAddress}/{distance}/{travelTime}/{farePrice}',
    name: 'FareCalculationResult',
    component: () => import(/* webpackChunkName: "about" */ '../components/FareCalculationResult.vue'),
    props:true,
    


  },
  {
    path: '/login',
    name: 'Login',
    meta: { guestOnly: true},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { authOnly: true},


  },
  {
    path: '/register',
    name: 'Register',
    meta: {guestOnly: true},
    component: () => import('../views/Register.vue')
  }
  
]

const router = new VueRouter({
  routes
})

function isLoggedIn() {
  return localStorage.getItem("auth")
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else   if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: '/dashboard',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
