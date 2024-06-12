import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import CallWaiter from '../views/CallWaiter.vue'
import Wishlist from '../views/WishlistView.vue'
import DrinksView from '@/views/DrinksView.vue'
import DetailedView from '@/views/DetailedView.vue'
import InfoView from '@/views/InfoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/drinks',
    name: 'drinks',
    component: DrinksView
  },
  {
    path: '/waiter',
    name: 'waiter',
    component: CallWaiter
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: Wishlist
  },
  {
    path: '/details/:title/:price/:description/:image/:full_description/:spice/:vegan/:free/:milk/:nutriValues/:alergens',
    name: 'details',
    component: DetailedView,
    props: true
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
