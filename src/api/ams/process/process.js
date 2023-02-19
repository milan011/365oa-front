import request from '@/utils/request'

export function createReimbursement(data) {
  return request({
    url: '/process/createForReimbursement',
    method: 'post',
    data: data
  })
}
