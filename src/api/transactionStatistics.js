import { fetch } from './request'

export function get_all(params) {
  return fetch({
    url: '/hfpay/statistics/company',
    method: 'get',
    params
  })
}

export function exportData(params) {
  return fetch({
    url: '/hfpay/statistics/exportData',
    method: 'get',
    params
  })
}
