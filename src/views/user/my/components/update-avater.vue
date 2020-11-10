<!-- vue 快捷方式 -->
<template>
  <div class="avater-img">
    <img class="imgAvater" :src="img" ref="img" />
    <div class="btm">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="comfirm" @click="onConfirm">确认</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user'
export default {
  // 组件的名字
  name: 'UpdateAvater',
  // 父子组件传值时使用
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    // 这里存放数据
    return {
      cropper: ''
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 方法集合
  methods: {
    onConfirm() {
      // 基于服务端剪切使用 getData 方法获取参数
      // console.log(this.cropper.getData())

      // 纯客户端剪裁使用 getCropperCanvas 获取剪裁对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // console.log(blob)
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        })
        try {
          // 创建formData数据
          const formData = new FormData()
          formData.append('photo', blob)
          const res = await updateUserAvatar(formData)
          // console.log(res)
          // 关闭弹层，更新视图
          this.$emit('close')
          this.$emit('update-avatar', res.data.photo)
          this.$toast('更新成功')
        } catch (err) {
          this.$toast('更新失败')
        }
      })
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  }
}
</script>
<style lang='less' scoped>
.avater-img {
  height: 100%;
  background-color: #000;
  .btm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .comfirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      color: #fff;
      line-height: 90px;
      text-align: center;
    }
  }
}
.imgAvater {
  display: block;
  width: 100%;
}
</style>