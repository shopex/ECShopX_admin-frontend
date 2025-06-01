import { coreRoutes } from './core'

const dynamicRouteFiles = require.context('./modules', false, /\.js$/)

console.log(
  'dynamicRouteFiles',
  dynamicRouteFiles.keys().filter(key => key.startsWith('./'))
)
debugger

// 基础路由
const routes = [...coreRoutes]

// 动态路由
const accessRoutes = [...dynamicRouteFiles]

export { accessRoutes, routes }
