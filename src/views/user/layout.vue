<template>
  <div>
    <!-- 父路由的出口 -->
    <router-view></router-view>
    <!-- 底部导航栏模块 -->
    <van-tabbar route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconshouye iconfont"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconwenda iconfont"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconshipin iconfont"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconwode iconfont"></i>
        <span> {{ $store.state.user ? '我的' : '未登录' }} </span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.van-tabbar {
  .van-tabbar-item {
    i.iconfont {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>