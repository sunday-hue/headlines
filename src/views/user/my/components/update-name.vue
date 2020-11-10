<!-- vue 快捷方式 -->
<template>
  <div class="update-name">
    <van-nav-bar
      left-text="取消"
      right-text="完成"
      title="修改用户名称"
      @click-left="$emit('close')"
      @click-right="updateSuccess"
    />
    <van-field
      v-model="localname"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入修改的用户名"
      show-word-limit
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { updateUserProfile } from '@/api/user'
export default {
  // 组件的名字
  name: 'UpdateName',
  // 父子组件传值时使用
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    // 这里存放数据
    return {
      localname: this.value
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 方法集合
  methods: {
    async updateSuccess() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // console.log(1)
        await updateUserProfile({
          name: this.localname
        })
        // console.log(data)
        // 修改视图
        this.$emit('input', this.localname)
        // 关闭弹出层
        this.$emit('close')
        // 提示修改成功
        this.$toast('修改用户名成功')
      } catch (err) {
        this.$toast('更改用户名失败')
      }
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
.update-name {
  box-sizing: border-box;
  /deep/.van-field {
    margin: 20px 0;
  }
}
</style>