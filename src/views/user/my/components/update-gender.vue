<!-- vue 快捷方式 -->
<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="修改性别"
      :columns="columns"
      :default-index="this.value"
      @cancel="$emit('close')"
      @confirm="updateSuccess"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { updateUserProfile } from '@/api/user'

export default {
  // 组件的名字
  name: 'UpdateGender',
  // 父子组件传值时使用
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    // 这里存放数据
    return {
      columns: ['男', '女']
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 方法集合
  // methods: {
  //   onConfirm(value, index) {
  //     console.log(value, index)
  //   },
  //   onChange(picker, value, index) {},
  //   onCancel() {
  //     console.log('取消')
  //   }
  // },
  methods: {
    async updateSuccess(value, index) {
      // console.log(value, index)
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // console.log(1)
        await updateUserProfile({
          gender: this.value
        })
        // console.log(data)
        // 修改视图
        this.$emit('input', index)
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
</style>