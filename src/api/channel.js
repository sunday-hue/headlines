import request from '@/utils/request'
/*  获取所有频道的列表
 */
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/*  添加用户频道列表
 */
export const editUserChannels = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [data]
    }
  })
}
/*  删除用户频道列表
 */
export const delUserChannel = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
