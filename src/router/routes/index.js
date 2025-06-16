import { coreRoutes, fallbackNotFoundRoute } from './core'

const dynamicRouteFiles = require.context('./modules', false, /\.js$/)

function mergeRouteModules(routeModules) {
  const mergedRoutes = []

  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = dynamicRouteFiles(routeModule)?.default ?? []
    mergedRoutes.push(...moduleRoutes)
  }

  return mergedRoutes
}

const dynamicRoutes = mergeRouteModules(
  dynamicRouteFiles.keys().filter(key => key.startsWith('./'))
)

// 基础路由
const routes = [...coreRoutes]

// 动态路由
const accessRoutes = [...dynamicRoutes]

export { accessRoutes, routes }
