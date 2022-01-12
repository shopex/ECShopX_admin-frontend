// 配置路由
const name = '设置-小程序管理'
import Layout from '@/view/layout' // 主框架

export default {
  path: '/setting',
  component: Layout,
  children: [
    {
      path: 'wxappmanage',
      name: `小程序管理`,
      component: () => import( '@/view/wxapp/minimanage/list' ),
    },
  ]
}
