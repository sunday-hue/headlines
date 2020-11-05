<!-- vue 快捷方式 -->
<template>
  <div class="serch">
    <form action="/">
      <van-search
        v-model="serchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isContaierShow = false"
      />
    </form>
    <!-- 搜索内容 定义内容是否显示，true才显示-->
    <serchContaier :serchText="serchText" v-if="isContaierShow" />
    <!-- 搜索联想 否则，如果输入框里有内容，就渲染搜索建议-->
    <serchSuggesstion
      :serchText="serchText"
      @searchtext="onSearch"
      v-else-if="serchText"
    />
    <!-- 搜索历史 最后，什么都没有，就会显示搜索历史-->
    <serchHistory
      v-else
      :serchHistory="serchHistory"
      @search="onSearch"
      @delall="serchHistory = []"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import serchContaier from '@/views/user/serch/compontent/serch-container'
import serchHistory from '@/views/user/serch/compontent/serch-history'
import serchSuggesstion from '@/views/user/serch/compontent/serch-suggesstion'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'serch',
  // import引入的组件需要注入到对象中才能使用
  data() {
    // 这里存放数据
    return {
      serchText: '',
      isContaierShow: false, // 历史结果是否显示，
      serchHistory: getItem('historyItem') || [] // 搜索历史的数组
    }
  },
  components: {
    serchContaier,
    serchHistory,
    serchSuggesstion
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    serchHistory: function (val) {
      // console.log(val)
      setItem('historyItem', val)
    }
  },
  // 方法集合
  methods: {
    // 搜索事件（搜集上的搜索按钮，电脑上的回车）
    onSearch(val) {
      // console.log(val)
      // 搜索框里的值
      this.serchText = val
      // 判断历史框的数组里和当前输入框的值是否重复

      // 数组.indexOf,如果有就返回该数所在的索引，如果没有就返回-1
      const i = this.serchHistory.indexOf(val)
      if (i !== -1) {
        // 删除原先有的搜索事件
        this.serchHistory.splice(i, 1)
      }
      // 把搜索框里的值，放在搜索历史数组的最前面
      this.serchHistory.unshift(val)
      // console.log(this.serchHistory)
      this.isContaierShow = true
    },
    // 点击取消按钮，跳回来时的那个网页
    onCancel() {
      // console.log('onCancel')
      this.$router.back()
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
.van-search {
  background-color: #3296fa;
  .van-search__action {
    color: #fff;
  }
}
</style>