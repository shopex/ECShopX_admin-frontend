import fetch from '@/utils/fetch'

/* 商家设置 */

// 商家分类列表
export function getMerchantsClassification(params = {}) {
    return fetch({
        url: '/merchant/type/list',
        method: 'get',
        params: params
    })
}
//新增商家分类
export function addMerchantsClassification(params = {}) {
    return fetch({
        url: '/merchant/type/create',
        method: 'post',
        params: params
    })
}

// 编辑商家分类
export function editMerchantsClassification(id,params = {}) {
    return fetch({
        url: `/merchant/type/${id}`,
        method: 'put',
        params
    })
}

// 删除商家分类
export function deleteMerchantsClassification(id) {
    return fetch({
        url: `/merchant/type/${id}`,
        method: 'delete',
    })
}

//获取商家基础配置
export function getShopConfig() {
    return fetch({
        url:'/merchant/basesetting',
        method:'get'
    })
}
// b保存商家基础设置
export function saveShopConfig(params) {
    return fetch({
        url:'/merchant/basesetting',
        method:'post',
        params
    })
}

// 添加/更新 商家
export function addTheBusinessman(params,id) {
    return fetch({
        url:`/api/merchant${id?`/${id}`:''}`,
        method:'post',
        params
    })
}