<!-- vue 快捷方式 -->
<template>
  <div class="user-profile">
    <van-nav-bar
      class="van-nav-bar-title"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 修改头像 -->
    <input type="file" hidden ref="inputFile" @change="photoShow" />

    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avater" fit="cover" round :src="userProfile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userProfile.name"
      is-link
      @click="nameShow"
    />
    <van-cell
      title="性别"
      :value="userProfile.gender === 0 ? '男' : '女'"
      is-link
      @click="genderShow"
    />
    <van-cell
      title="生日"
      :value="userProfile.birthday"
      is-link
      @click="birthdayShow"
    />

    <!-- 修改昵称 -->
    <van-popup
      v-model="isNameShow"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <update-name
        v-model.trim="userProfile.name"
        v-if="isNameShow"
        @close="isNameShow = false"
      />
    </van-popup>
    <!-- 修改性别 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <update-gender
        v-model.trim="userProfile.gender"
        v-if="isGenderShow"
        @close="isGenderShow = false"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <update-birthday
        v-model="userProfile.birthday"
        v-if="isBirthdayShow"
        @close="isBirthdayShow = false"
      />
    </van-popup>
    <!-- 修改头像 -->
    <van-popup
      v-model="isPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avater
        v-if="isPhotoShow"
        :img="img"
        @update-avatar="userProfile.photo = $event"
        @close="isPhotoShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getUserProfile } from '@/api/user'
import UpdateName from './update-name'
import UpdateGender from './update-gender'
import UpdateBirthday from './update-birthday'
import UpdateAvater from './update-avater'
export default {
  // 组件的名字
  name: 'UserProfile',
  // 父子组件传值时使用
  props: {},
  data() {
    // 这里存放数据
    return {
      userProfile: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      img: null
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadUserProfile()
  },
  // 方法集合
  methods: {
    // 获取用户信息
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.userProfile = data.data
        // console.log(this.userProfile)
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    },
    nameShow() {
      this.isNameShow = true
    },
    genderShow() {
      this.isGenderShow = true
    },
    birthdayShow() {
      this.isBirthdayShow = true
    },
    photoShow() {
      // 获取文章对象
      const file = this.$refs.inputFile.files[0]
      // 基于对象获取blob对象
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片的弹层
      this.isPhotoShow = true
      // file-input
      this.$refs.inputFile.value = ''
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvater
  },
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
.user-profile {
  box-sizing: border-box;
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  .avater {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f8f8f8;
  }
}
</style>