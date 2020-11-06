/*
 *axios的请求
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// 创建axios实例
const require = axios.create({
  // 配置请求的根路径
  baseURL: 'http://ttapi.research.itcast.cn/', // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse允许自定义原始的响应数据
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return { data }
      }
      // 对 data 进行任意转换处理
      // 默认返回的是 JSON(data)
    }
  ]
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
