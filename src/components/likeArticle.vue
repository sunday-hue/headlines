<!-- vue 快捷方式 -->
<template>
  <van-icon
    :loading="loading"
    :color="isLike === 1 ? '#ed1728' : ''"
    :name="isLike === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
  />
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { addlike, dellike } from '@/api/article'
export default {
  // 组件的名字
  name: 'LickArticle',
  // 父子组件传值时使用
  props: {
    isLike: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  model: {
    prop: 'isLike',
    event: 'update-like'
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
    async onLike() {
      this.loading = true
      try {
        let atu = -1
        if (this.isLike === 1) {
          // 已添加喜欢，执行取消喜欢的操作
          await dellike(this.articleId)
        } else {
          // 已取消喜欢，执行添加喜欢的操作
          await addlike(this.articleId)
          atu = 1
        }
        // 控制弹窗框显示的内容
        if (atu === 1) {
          this.$toast.success('添加喜欢')
        } else {
          this.$toast.success('取消喜欢')
        }

        // 修改视图，传递给父组件修改数据
        this.$emit('update-like', atu)
      } catch (err) {
        this.$toast('获取数据失败')
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
  color: #ed1728;
}
</style>