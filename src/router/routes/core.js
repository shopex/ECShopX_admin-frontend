import { AuthPageLayout } from '@/layout'

/** 全局404页面 */
const fallbackNotFoundRoute = {
  component: () => import('@/views/core/fallback/not-found.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404'
  },
  name: 'FallbackNotFound',
  path: '/:path(.*)*'
}

const coreRoutes = [
  {
    component: AuthPageLayout,
    meta: {
      title: 'Authentication'
    },
    name: 'Authentication',
    path: '/',
    // redirect: '/login',
    children: [
      {
        component: () => import('@/views/core/authentication/login.vue'),
        name: 'Login',
        path: 'login'
      }
    ]
  },
  {
    component: AuthPageLayout,
    meta: {
      title: 'Authentication'
    },
    name: 'ShopAdminAuthentication',
    path: '/shopadmin',
    // redirect: '/shopadmin/login',
    children: [
      {
        component: () => import('@/views/core/authentication/shop-login.vue'),
        name: 'ShopAdminLogin',
        path: 'login'
      }
    ]
  }
]

export { coreRoutes, fallbackNotFoundRoute }
