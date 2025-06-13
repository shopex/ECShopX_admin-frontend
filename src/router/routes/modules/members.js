import { BasicLayout } from '@/layout/basic'

const routes = [
  {
    component: BasicLayout,
    meta: {
      aliasName: 'member',
      icon: 'user-group',
      keepAlive: true,
      title: '会员'
    },
    name: 'member',
    path: '/member',
    children: [
      {
        name: 'memberList',
        path: 'member-manage/member-list',
        component: () => import('@/view/member/members/list'),
        meta: {
          title: '会员列表',
          icon: 'icon-member'
        },
        children: [
          {
            path: 'detail/:user_id?',
            component: () => import('@/view/member/members/detail'),
            meta: {
              title: '会员详情',
              hidden: true
            }
          },
          {
            path: 'chief-upload',
            component: () => import('@/view/member/members/upload_chief'),
            meta: {
              title: '上传主管',
              hidden: true
            }
          }
        ]
      },
      {
        name: 'memberLevel',
        path: 'member-manage/level',
        component: () => import('@/view/member/level'),
        meta: {
          title: '等级管理',
          icon: 'icon-level'
        }
      },
      {
        name: 'memberLevelOrder',
        path: 'member-manage/level-order',
        component: () => import('@/view/member/membercard/list'),
        meta: {
          title: '等级购买记录'
        }
      },
      {
        name: 'memberTagCategory',
        path: 'member-tag/tag-category',
        component: () => import('@/view/member/members/tagcategory.vue'),
        meta: {
          title: '会员标签分组'
        }
      },
      {
        name: 'memberTag',
        path: 'member-tag/tag-list',
        component: () => import('@/view/member/members/tags'),
        meta: {
          title: '会员标签'
        }
      },
      {
        name: 'whiteList',
        path: 'white-list/list',
        component: () => {
          if (VERSION_IN_PURCHASE()) {
            return import('@/view/member/whitelist/list.purchase')
          } else {
            return import('@/view/member/whitelist/list')
          }
        },
        meta: {
          title: '白名单列表'
        }
      },
      {
        name: 'whiteListUpload',
        path: 'white-list/upload',
        component: () => import('@/view/member/whitelist/uploadeindex'),
        meta: {
          title: '白名单导入',
          hidden: true
        }
      },
      {
        name: 'pointManage',
        path: 'point/point-rule',
        component: () => import('@/view/member/point/index.vue'),
        meta: {
          title: '积分规则'
        }
      },
      {
        name: 'pointOverview',
        path: 'point/overview',
        component: () => import('@/view/member/point/overview.vue'),
        meta: {
          title: '积分总览'
        }
      },
      {
        name: 'memberRights',
        path: 'member-rights',
        component: () => import('@/view/member/members/rightsList'),
        meta: {
          title: '会员权益'
        }
      },
      {
        name: 'memberNotice',
        path: 'notice/sms',
        component: () => import('@/view/member/members/list'),
        meta: {
          title: '群发短信'
        }
      },
      {
        name: 'arrivalNotice',
        path: 'notice/arrival',
        component: () => import('@/view/goods/arrivalNotice'),
        meta: {
          title: '到货通知'
        }
      },
      {
        name: 'memberSetting',
        path: 'setting/register-info',
        component: () => import('@/view/member/register'),
        meta: {
          title: '会员注册信息'
        }
      },
      {
        name: 'salemanProtocol',
        path: 'setting/saleman-protocol',
        component: () => import('@/view/member/salemanprotocol'),
        meta: {
          title: '业务员协议'
        }
      },
      {
        name: 'memberRecharge',
        path: 'recharge',
        component: () => import('@/view/mall/storeddeposit/index'),
        meta: {
          title: '会员储值'
        }
      },
      {
        name: 'memberImport',
        path: 'member-manage/import',
        component: () => import('@/view/member/members/uploade'),
        meta: {
          title: '会员信息导入',
          hidden: true
        }
      },
      {
        name: 'trustLogin',
        path: 'setting/trust-login',
        component: () => import('@/view/member/trustlogin/list'),
        meta: {
          title: '信任登录'
        }
      },
      {
        name: 'memberLogout',
        path: 'setting/logout',
        component: () => import('@/view/member/logout'),
        meta: {
          title: '会员注销'
        }
      }
    ]
  }
]

export default routes
