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