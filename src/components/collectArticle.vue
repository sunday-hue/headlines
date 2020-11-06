<!-- vue 快捷方式 -->
<template>
  <!-- <van-icon color="#777" name="star-o" :loading="loading" /> -->
  <van-icon
    class="collect-article"
    :color="isCollect ? '#ffc700' : ''"
    :name="isCollect ? 'star' : 'star-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { addcollect, delcollect } from '@/api/article'
export default {
  // 组件的名字
  name: 'CollectArticle',
  // 父子组件传值时使用
  props: {
    isCollect: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  model: {
    prop: 'isCollect',
    event: 'update-collect'
  },
  data() {
    // 这里存放数据
    return {
      loading: false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 方法集合
  methods: {
    // 点击收藏触发的事件
    async onCollect() {
      this.loading = true
      try {
        if (this.isCollect) {
          // 已收藏点击取消
          await delcollect(this.articleId)
        } else {
          // 已取消点击收藏
          await addcollect(this.articleId)
        }
        this.$toast.success(!this.isCollect ? '收藏成功' : '取消收藏')
        // 更改试图，向父组件发送修改数据的请求
        this.$emit('update-collect', !this.isCollect)
      } catch (err) {
        this.$toas('获取数据失败')
      }
      this.loading = false
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
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
/deep/.van-icon {
  color: #ffc700;
}
</style>