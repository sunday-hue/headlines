<template>
  <div>
    <!-- 已登陆状态 -->
    <div class="login_home login" v-if="user">
      <!-- 头部 -->
      <div class="navBar">
        <!-- 左边 -->
        <div class="left">
          <div class="pho">
            <van-image round class="img" :src="userInfo.photo" />
            <!-- <van-image
              round
              class="img"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            /> -->
          </div>
          <div class="regist">{{ userInfo.name }}</div>
        </div>
        <!-- 右边 -->
        <div class="right">
          <van-button color="skyblue" plain class="btn" round
            >编辑资料</van-button
          >
        </div>
      </div>
      <!-- 底部 -->
      <div class="btmBar">
        <div class="data_item">
          <span class="num">{{ userInfo.art_count }}</span>
          <span class="mane">动态</span>
        </div>
        <div class="data_item">
          <span class="num">{{ userInfo.follow_count }}</span>
          <span class="mane">关注</span>
        </div>
        <div class="data_item">
          <span class="num">{{ userInfo.fans_count }}</span>
          <span class="mane">粉丝</span>
        </div>
        <div class="data_item">
          <span class="num">{{ userInfo.like_count }}</span>
          <span class="mane">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录状态 -->
    <div class="login_home" v-else>
      <div class="unlogin">
        <div class="unlogin_box" @click="$router.push('/login')">
          <div class="avater">
            <img src="~@/assets/mobile.png" />
          </div>
          <div class="text">登录 / 注册</div>
        </div>
      </div>
    </div>

    <!-- 导航宫格 -->
    <van-grid :column-num="3" class="grid" clickable>
      <van-grid-item class="item1" icon="star-o" text="收藏" />
      <van-grid-item class="item2" icon="clock-o" text="历史" />
      <van-grid-item class="item3" icon="notes-o" text="作品" />
    </van-grid>

    <van-cell class="info" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      title="退出登录"
      v-if="user"
      class="loginout"
      clickable
      @click="loginout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'mypage',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  // 加载用户自己的信息
  created() {
    if (this.user) {
      this.loadUser()
    }
  },
  methods: {
    loginout() {
      // 点击退出的时候，跳转界面
      // $router.push('/login')
      // console.log(this.$store.state.user.token)
      // 当点击退出的时候，只需要清除store里的usertoken的值
      this.$dialog
        .confirm({
          title: '确认退出',
          message: '确认退出吗？'
        })
        .then(() => {
          // on confirm
          if (this.user) {
            this.$store.commit('getUser', null)
          }
        })
        .catch(() => {
          this.$toast('取消删除')
        })
    },
    // 获取用户自己的信息
    async loadUser() {
      try {
        const { data: res } = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_home {
  background: url('~@/assets/banner.png');
  background-size: cover;

  .unlogin_box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .avater {
      display: flex;
      justify-content: center;
      img {
        width: 132px;
        height: 132px;
      }
    }
    .text {
      font-size: 34px;
      color: #fff;
      margin-top: 15px;
    }
  }

  .navBar {
    height: 231px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 76px 32px 29px;
    .left {
      display: flex;
      align-items: center;
      .pho {
        .img {
          width: 130px;
          height: 130px;
          margin-right: 23px;
          border: 5px solid #fff;
        }
      }
      .regist {
        font-size: 32px;
        color: #fff;
      }
    }
  }
  .btmBar {
    display: flex;
    .data_item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .num {
        color: #fff;
        font-size: 36px;
      }
      .mane {
        color: #fff;
        font-size: 23px;
      }
    }
  }
}
.unlogin {
  height: 361px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid {
  height: 141px;
  font-size: 28px;
  margin-bottom: 50px;
  .item1 {
    color: rgba(239, 116, 117);
  }
  .item2 {
    color: rgba(255, 172, 62);
  }
  .item3 {
    color: rgba(203, 216, 255);
  }
}
.van-cell {
  font-size: 30px;
}
.loginout {
  font-size: 50px;
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>