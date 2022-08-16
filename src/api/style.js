import request from '@/utils/request'

// 查询款式列表
export function list(params) {
  return request({
    url: '/style/xb_list',
    method: 'get',
    params
  })
}

// 查询箱包报价单信息
export function info(id) {
  return request({
    url: `/style/${id}`,
    method: 'get'
  })
}
