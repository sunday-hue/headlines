<!-- vue 快捷方式 -->
<template>
  <!-- <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  > -->
  <van-button
    v-if="isFollow"
    @click="followUser"
    class="follow-btn"
    round
    :loading="isLoading"
    size="small"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="badge"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    :loading="isLoading"
    @click="followUser"
    >关注</van-button
  >
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { followUser, deleteFollow } from '@/api/user'

export default {
  // 组件的名字
  name: 'FollowUser',
  // 父子组件传值时使用
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    authorID: {
      trpe: [String, Number, Object],
      required: true
    }
  },
  model: {
    prop: 'isFollow',
    event: 'update-follow'
  },
  data() {
    // 这里存放数据
    return {
      isLoading: false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 方法集合
  methods: {
    // 是否关注用户
    async followUser() {
      // 刚开始进入界面就打  开loding状态
      this.isLoading = true
      try {
        // 已关注，就取消关注
        if (this.isFollow) {
          await deleteFollow(this.authorID)
          // console.log(data)
        } else {
          // 未关注
          await followUser(this.authorID)
          // console.log(data)
        }
        // 不管是点击关注，还是未关注，关注按钮都需要改变状态
        this.$emit('update-follow', !this.isFollow)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己')
        } else {
          this.$toast('获取数据失败')
        }
      }
      // 结束的时候关闭loding状态
      this.isLoading = false
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
</style>