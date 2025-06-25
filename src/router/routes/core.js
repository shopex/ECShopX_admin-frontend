import { AuthPageLayout } from '@/layout'
import { BasicLayout } from '@/layout/basic'

/** 全局404页面 */
const fallbackNotFoundRoute = {
  component: BasicLayout,
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404'
  },
  // name: 'FallbackNotFound',
  path: '/',
  children: [
    {
      name: 'FallbackNotFound',
      path: 'not-found',
      component: () => import('@/views/core/fallback/not-found.vue')
    }
  ]
}

const coreRoutes = [
  {
    component: AuthPageLayout,
    meta: {
      title: 'Authentication'
    },
    name: 'authentication',
    path: '/',
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/core/authentication/login.vue')
      }
    ]
  },
  {
    component: AuthPageLayout,
    meta: {
      title: 'Authentication'
    },
    name: 'shopAdminAuthentication',
    path: '/shopadmin',
    children: [
      {
        name: 'shopAdminLogin',
        path: 'login',
        component: () => import('@/views/core/authentication/shop-login.vue')
      }
    ]
  },
  {
    name: 'shopAdminShopList',
    path: '/shopadmin/shoplist',
    component: () => import('@/views/store/shop-list.vue')
  }
]

export { coreRoutes, fallbackNotFoundRoute }
