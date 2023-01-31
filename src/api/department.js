import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/department/list',
    method: 'get',
    params: params
  })
}

export function createDepartment(data) {
  return request({
    url: '/department/create',
    method: 'post',
    data: data
  })
}

export function updateDepartment(id, data) {
  return request({
    url: '/department/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteDepartment(id) {
  return request({
    url: '/department/delete/' + id,
    method: 'post'
  })
}

export function fetchAllDepartmentList() {
  return request({
    url: '/department/listAll',
    method: 'get'
  })
}
