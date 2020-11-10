/*
用户请求模块
*/
import request from '@/utils/request'
// import store from '@/store'
// 用户登录请求模块
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取用户验证码接口
export const getCode = mobile => {
  return request({
    method: 'Get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息模块
export const getUserInfo = () => {
  return request({
    method: 'Get',
    url: '/app/v1_0/user'
    // 发送给请求头数据
    // headers: {
    //   Authorization: `Bearer  ${store.state.user.token}`
    // }
  })
}
// 获取用户自己的信息模块
export const getUserChannels = () => {
  return request({
    method: 'Get',
    url: '/app/v1_0/channels'
  })
}
// 关注模块
export const followUser = authorID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: authorID
    }
  })
}
// 取消关注模块
export const deleteFollow = authorID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${authorID}`
  })
}
// 获取当前登录用户自己的信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 修改当前登录用户的信息
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data: { data }
  })
}
/**
 * 更新头像
 */
export const updateUserAvatar = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
