<!-- vue 快捷方式 -->
<template>
  <!-- 添加评论回复 -->
  <van-popup v-model="show" :style="{ height: '30%' }" position="bottom"
    ><van-field
      v-model.trim="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      ><template #button>
        <van-button size="small" type="primary">发布</van-button>
      </template></van-field
    >
  </van-popup>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // 组件的名字
  name: 'addComment',
  // 父子组件传值时使用
  props: {
    // value: {
    //   type: Boolean,
    //   required: true
    // }
  },
  data() {
    // 这里存放数据
    return {
      // 是否显示弹出层
      show: false,
      // 弹出框里的内容
      message: ''
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 方法集合
  methods: {
    // 是否显示添加品论的弹出层
    showCommentPopup() {
      this.show = true
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