import { BasicLayout } from '@/layout/basic' // 主框架

const routes = [
  {
    component: BasicLayout,
    meta: {
      icon: 'icon-products',
      keepAlive: true,
      title: '商品'
    },
    name: 'products',
    path: '/products',
    children: [
      {
        meta: {
          icon: 'icon-products',
          title: '商品管理'
        },
        name: ``,
        path: 'management',
        children: [
          {
            name: '',
            path: 'self-products',
            component: () => import('@/view/mall/goods/physical/list'),
            meta: {
              icon: 'icon-products',
              title: '自营商品'
            }
          },
          {
            name: '',
            path: 'self-products/create',
            component: () => import('@/view/goods/index'),
            meta: {
              title: '新增商品',
              hidden: true
            }
          },
          {
            name: '',
            path: 'self-products/stock-import',
            component: () => import('@/view/mall/goods/physical/normalGoodsStoreUpload'),
            meta: {
              title: '库存导入',
              hidden: true
            }
          },
          {
            name: '',
            path: 'self-products/profit-sharing-import',
            component: () => import('@/view/mall/goods/physical/normalGoodsProfitUpload'),
            meta: {
              title: '分润导入',
              hidden: true
            }
          },
          {
            name: '',
            path: 'self-products/product-import',
            component: () => import('@/view/mall/goods/physical/normalGoodsUpload'),
            meta: {
              title: '商品导入',
              hidden: true
            }
          }
        ]
      }
    ]
  }
]

export default routes
