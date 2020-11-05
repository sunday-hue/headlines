import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的token
    user: getItem('userToken'),
    // 搜索页面
    serchInfo: {}
  },
  mutations: {
    // 获取用户登陆时的token
    getUser(state, token) {
      state.user = token
      // 把获取到的值，保存到存储端
      // console.log(state.user)
      setItem('userToken', state.user)
    }
  },
  actions: {},
  modules: {}
})
