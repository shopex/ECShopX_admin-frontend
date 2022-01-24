import fetch from '@/utils/fetch'

export function setTheNewSignature(params = {}) {
  return fetch({
    url: '/aliyunsms/sign/add',
    method: 'post',
    params
  })
}

export function getTheSignature(params) {
  return fetch({
    url: `/aliyunsms/sign/info`,
    method: 'get',
    params
  })
}

export function editTheSignature(params) {
  return fetch({
    url: `/aliyunsms/sign/modify`,
    method: 'post',
    params
  })
}

export function deleteTheSignature(id) {
  return fetch({
    url: `/aliyunsms/sign/delete/${id}`,
    method: 'delete',
  })
}

// 发送短信

// 短信场景列表
export function getScenarioList(params={}) {
  return fetch({
    url: `/aliyunsms/scene/list`,
    method: 'get',
    params
  })
}

// 停用短信场景
export function offDisablingSms(params) {
  return fetch({
    url: `/aliyunsms/scene/disableItem`,
    method: 'get',
    params
  })
}

// 启用短信场景
export function onDisablingSms(params) {
  return fetch({
    url: `/aliyunsms/scene/enableItem`,
    method: 'get',
    params
  })
}

// 删除短信场景
export function deletedDisablingSms(id) {
  return fetch({
    url: `/aliyunsms/scene/deleteItem/${id}`,
    method: 'delete',
  })
}

// 短信签名列表
export function getSmsSignatureList(params) {
  return fetch({
    url: `/aliyunsms/sign/list`,
    method: 'get',
    params
  })
}

// 短信模板列表
export function getSmsTemplateList(params) {
  return fetch({
    url: `/aliyunsms/template/list`,
    method: 'get',
    params
  })
}

// 添加短信场景条目
export function addSceneItem(params) {
  return fetch({
    url: `/aliyunsms/scene/addItem`,
    method: 'post',
    params
  })
}