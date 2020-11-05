<!-- vue 快捷方式 -->
<template>
  <div class="serch-suggesstion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggesstions"
      :key="index"
      @click="$emit('searchtext', item)"
    >
      <span slot="title" v-html="heightText(item)"></span>
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getSerchSuggesstions } from '@/api/serch'
import { debounce } from 'lodash'
export default {
  name: 'serchSuggesstion',
  props: {
    serchText: {
      type: String,
      required: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      // 后台获取的联想数据
      suggesstions: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    // 监听serchText数据的每一次发变化
    serchText: {
      // val就是搜索框中变化的值
      // handler是watch里的固定写法，不能更改
      // handler(val) {
      //   // console.log(val)
      //   this.lodSerchSuggessions(val)
      // },
      // debounce 防抖
      //  参数一：防抖时执行的函数
      //  参数二：防抖时间隔的时间，默认为0
      handler: debounce(function (val) {
        // console.log(val)
        this.lodSerchSuggessions(val)
      }, 300),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  // 方法集合
  methods: {
    async lodSerchSuggessions(q) {
      try {
        const { data } = await getSerchSuggesstions(q)
        // console.log(data)
        this.suggesstions = data.data.options
      } catch (err) {
        this.$toast('获取联想数据失败', err)
      }
    },
    // 查找与输入框里匹配的值，并高亮显示
    heightText(text) {
      // 使用new RegExp 的方式new一个数据函数
      // 参数一：数据的变量，可以把变量里的值解析为一个数据
      // 参数二：正则的匹配属性（选择全局匹配。。。）
      const reg = new RegExp(this.serchText, 'gi')
      // 需要替换成为...样的的数据
      const regStr = `<span class="active">${this.serchText}</span>`
      // replace不会改变原来数组的值，会在原来的数据上重新返回一个数组
      return text.replace(reg, regStr)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.serch-suggesstion {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>