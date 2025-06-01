import { BasicLayout } from '@/layout/basic' // 主框架

export default {
  path: '/',
  component: BasicLayout,
  children: [
    {
      path: 'dashboard',
      name: `dashboard`,
      meta: {
        // title: `${name}`,
        hidemenu: true
      },
      component: () => import('@/view/base/index')
    },
    {
      path: 'admininfo',
      name: `dashboard`,
      meta: {
        hidemenu: true
      },
      component: () => import('@/view/base/shop/admininfo')
    }
  ]
}
