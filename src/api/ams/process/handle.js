import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/process/handleList',
    method: 'get',
    params: params
  })
}
