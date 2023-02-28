import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/process/handleList',
    method: 'get',
    params: params
  })
}

export function fetchRecordList(params) {
  return request({
    url: '/process/handleRecordList',
    method: 'get',
    params: params
  })
}

