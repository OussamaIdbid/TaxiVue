import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/layouts/NotFound.vue'

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
    path: '/FareCalculationResult',
    name: 'FareCalculationResult',
    component: () => import(/* webpackChunkName: "FareCalculationResult" */ '../components/FareCalculationResult.vue'),
    // meta: {CalculatedOnly: true}

  },
  {
    path: '/Reserveer',
    name: 'ReservationForm',
    component: () => import(/* webpackChunkName: "ReservationForm" */ '../components/ReservationForm.vue')
    // props:true,
    // meta: {CalculatedOnly: true}

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
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    meta: {guestOnly: true},
    component: () => import(/* webpackChunkName: "verifyEmail" */ '../components/auth/VerifyEmail.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    meta: {guestOnly: true},
    component: () => import(/* webpackChunkName: "ForgotPassword" */ '../components/auth/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    meta: {guestOnly: true},
    component: () => import(/* webpackChunkName: "ResetPassword" */ '../components/auth/ResetPassword.vue'),
  },
  {
    path: '/payment',
    name: 'PaymentResult',
    meta: {authOnly: true},
    component: () => import(/* webpackChunkName: "PaymentResult" */ '../components/payment/PaymentResult.vue'),
  },
  {
    path: '/reservations',
    name: 'Reservations',
    meta: {authOnly: true},
    component: () => import(/* webpackChunkName: "Reservations" */ '../components/auth/Reservations.vue'),
  },
  { path: '*',
    name: 'notFound' ,
    component: NotFound }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

function isLoggedIn() {
  return localStorage.getItem("auth")
}
function isCalculated() {
  return localStorage.getItem("calculated")
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.CalculatedOnly)) {
    if (!isCalculated()) {
      next({
        path: '/',
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
