import fetch from '@/utils/fetch'

export function getImageList (params) {
  return fetch({
    url: '/espier/images',
    method: 'get',
    params
  })
}

export function addImageCatgory (params) {
  return fetch({
    url: '/espier/image/cat',
    method: 'post',
    params
  })
}

export function getImageAllCatgory (params) {
  return fetch({
    url: `/espier/image/cat/children`,
    method: 'get',
    params
  })
}
