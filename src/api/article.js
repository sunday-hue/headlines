// 引入导入axios请求
import request from '@/utils/request'
// 获取频道相应的文章内容数据
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取频道相应的文章内容数据
export const articalItem = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
