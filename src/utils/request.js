/*
 *axios的请求
 */
import axios from 'axios'
import store from '@/store'
// 创建axios实例
const require = axios.create({
  // 配置请求的根路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
// 添加请求拦截器
require.interceptors.request.use(
  function(config) {
    const { user } = store.state
    // 在发送请求之前做些什么
    // console.log(user)
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截器
// 导出
export default require
