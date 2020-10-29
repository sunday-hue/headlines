import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.sessionStorage.getItem('USERTOKEN'))
    user: getItem('userToken')
  },
  mutations: {
    getUser(state, token) {
      state.user = token
      // 把获取到的值，保存到存储端
      // window.sessionStorage.setItem('USERTOKEN', JSON.stringify(token))
      setItem('userToken', state.user)
    }
  },
  actions: {},
  modules: {}
})
