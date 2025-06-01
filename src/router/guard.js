import { useNProgress } from '@/composables'
import store from '@/store'
import { generateAccess } from './access'
import { accessRoutes } from './routes'

const { startProgress, stopProgress } = useNProgress()

function setupCommonGuard(router) {
  router.beforeEach((to, from, next) => {
    startProgress()
    next()
  })

  router.afterEach((to, from, next) => {
    debugger
    stopProgress()
    // next()
  })
}

function setupAccessGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const hasToken = store.state.user.token
    if (!hasToken) {
      // return {
      //   path: '/login',
      //   query: {
      //     redirect: encodeURIComponent(to.fullPath)
      //   },
      //   replace: true
      // }
      debugger
      next()
      return
    }

    // 生成菜单和路由
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      router,
      routes: accessRoutes
    })

    debugger

    stopProgress()
  })
}

function createRouterGuard(router) {
  setupCommonGuard(router)

  setupAccessGuard(router)
}

export { createRouterGuard }
