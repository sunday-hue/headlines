<!-- vue 快捷方式 -->
<template>
  <div class="serch-history">
    <van-cell title="搜索历史" class="history-title">
      <div v-if="isDeleteShow">
        <span @click="$emit('delall')">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :key="index"
      v-for="(item, index) in serchHistory"
      :title="item"
      @click="onSearchItem(item, index)"
    >
      <van-icon name="clear" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import { setItem } from '@/utils/storage'
export default {
  name: 'serchHistory',
  // props: {
  //   serchHistory: {
  //     type: Array,
  //     required: true
  //   }
  // },
  props: ['serchHistory'],
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      // 删除按钮是否显示
      isDeleteShow: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击每一个历史搜索时，应该可能执行的事件
    onSearchItem(item, index) {
      // 当在删除模式时，就执行删除操作
      if (this.isDeleteShow) {
        this.serchHistory.splice(index, 1)
      } else {
        // 否则，需要显示搜索页面
        this.$emit('search', item)
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
.serch-history {
  .history-title {
    span {
      padding-left: 10px;
    }
  }
}
</style>