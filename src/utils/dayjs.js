import Vue from 'vue'
import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 修改全局的语言格式
dayjs.locale('zh-cn')
// 扩展插件，（到今天有多少天：倒计时）
dayjs.extend(relativeTime)
// console.log(dayjs().to(dayjs()))
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
