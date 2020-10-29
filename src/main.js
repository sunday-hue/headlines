import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import './styles/index.css'
// 引入vant
import vant from 'vant'
import 'vant/lib/index.css'
// 导入自适配插件 动态加载rem基准值
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.use(vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
