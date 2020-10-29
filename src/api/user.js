/*
用户请求模块
*/
import request from '@/utils/request'
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const getCode = mobile => {
  return request({
    method: 'Get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
