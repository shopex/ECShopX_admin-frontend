import Vue from 'vue'
import VueRouter from 'vue-router'
import { createRouterGuard } from './guard'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

// 创建路由守卫
createRouterGuard(router)

export default router
