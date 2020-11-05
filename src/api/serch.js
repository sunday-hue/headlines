/*
 * home界面的搜索模块
 */

import request from '@/utils/request'

//  获取搜索建议数据
export const getSerchSuggesstions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
//  获取搜索结果
export const getSerchResaults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
