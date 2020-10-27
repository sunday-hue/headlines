/*
 *axios的请求
 */
import axios from 'axios'
const require = axios.create({
  // 配置请求的根路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 导出
export default require
