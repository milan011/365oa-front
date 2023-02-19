import request from '@/utils/request'

export function createReimbursement(data) {
  return request({
    url: '/reimbursement/create',
    method: 'post',
    data: data
  })
}
