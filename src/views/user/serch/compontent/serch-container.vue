<!-- vue 快捷方式 -->
<template>
  <div class="serch-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(search, index) in list"
        :key="index"
        :title="search.title"
      />
    </van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getSerchResaults } from '@/api/serch'
export default {
  name: 'serchContaier',
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
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1, // 当前页数，默认为1
      per_page: 10 // 每一页展示的条数
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad() {
      // 异步更新数据
      // 请求后台接口，胡哦去数据
      try {
        const { data } = await getSerchResaults({
          page: this.page, // 页数
          per_page: this.per_page, // 每页数量
          q: this.serchText // 搜索关键词
        })
        // console.log(data)
        const { results } = data.data
        // 把从后请求道的数据，存到数组里面
        this.list.push(...results)
        // 加载状态结束
        this.loading = false

        // 判断数组里是否有数据，有就更新下一页，没有就让finished为false
        if (results.length) {
          this.per_page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
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
/* @import url(); 引入公共css类 */
</style>