import request from '@/utils/request'

/*获取审批详情*/
export function processDetailFetch(id) {
  return request({
    url: `/process/processDetail?id=${id}`,
    method: 'get'
  })
}
/*审批单审核*/
export function processExamine(data) {
  return request({
    url: '/process/processExamine',
    method: 'post',
    data: data
  })
}
/*报销审批单创建*/
export function createReimbursement(data) {
  return request({
    url: '/process/createForReimbursement',
    method: 'post',
    data: data
  })
}
/*采购审批单创建*/
export function createBuyPlay(data) {
  return request({
    url: '/process/createForBuyPlan',
    method: 'post',
    data: data
  })
}
/*付款单创建*/
export function createPayApply(data) {
  return request({
    url: '/process/createForPayApply',
    method: 'post',
    data: data
  })
}

/*预付款单创建*/
export function createAdvance(data) {
  return request({
    url: '/process/createForAdvance',
    method: 'post',
    data: data
  })
}

/*合同审批单创建*/
export function createContract(data) {
  return request({
    url: '/process/createForContract',
    method: 'post',
    data: data
  })
}

/*工程项目付款单创建*/
export function createProject(data) {
  return request({
    url: '/process/createForProject',
    method: 'post',
    data: data
  })
}
