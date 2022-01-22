import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import SetUp from '../views/Setup.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SetUp',
    component: SetUp
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Game.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
