<template>
  <div class="login_container">
    <!-- 头部登录 -->
    <van-nav-bar title="登录" class="van-nav-bar-title" />
    <!-- 表单输入框区域 -->
    <van-form @submit="onLogin" ref="loginFormRef">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconshouji iconfont"></i>
      </van-field>
      <van-field
        name="code"
        v-model="user.code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconyanzhengma iconfont"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isDowenTimeVisible"
            :time="1000 * 60"
            format=" ss 秒"
            @finish="isDowenTimeVisible = false"
          />
          <van-button
            v-else
            native-type="button"
            class="sent"
            size="small"
            type="primary"
            round
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div class="login_btm">
        <van-button block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user.js'
export default {
  name: 'loginPage',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请输入正确内容' },
          {
            pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式输入错误'
          }
        ],
        code: [
          { required: true, message: '请输入正确内容' },
          { pattern: /^\d{6}$/, message: '验证码格式输入错误' }
        ]
      },
      isDowenTimeVisible: false
    }
  },
  created() {},
  methods: {
    async onLogin() {
      // console.log(this.user)
      // 1:获取表单数据
      // const user = this.user
      // 2:表单验证
      // 在表单验证的时候，持续显示加载中
      this.$toast.loading({
        message: '登录中...', // 提示信息
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续时间，0表示时序展示不停止
      })
      // 3:提交表单请求数据
      try {
        const { data: res } = await login(this.user)
        console.log('登陆成功', res)
        this.$store.commit('getUser', res.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登陆成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登陆失败，请稍后重试', err)
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
      // 4:根据请求相应的数据处理后续操作
    },
    // 发送验证码
    async sendCode() {
      try {
        await this.$refs.loginFormRef.validate('mobile')
        // console.log('mobile')
        // 手机号校验成功就调用接口想改手机号发送信息
        await getCode(this.user.mobile)
        this.$toast('手机号正确')
        // 当手机验证成功之后就会显示倒计时
        this.isDowenTimeVisible = true
      } catch (err) {
        // 该连接自带一分钟内不能频繁发送的功能
        this.isDowenTimeVisible = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  },
  components: {},
  computed: {}
}
</script>

<style lang="less" scoped>
.login_btm {
  border: 0;
  margin: 53px 28px;
  .van-button {
    background-color: #6db4fb;
    color: #f7faff;
    border: 0;
    border-radius: 20px;
  }
}
.iconfont {
  font-size: 37px;
}
.sent {
  height: 48px;
  width: 155px;
  font-size: 22px;
  line-height: 48px;
  background-color: #ededed;
  border: 0;
  color: #666;
}
</style>
