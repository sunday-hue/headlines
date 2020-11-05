<template>
  <div class="home_container">
    <!-- 头部搜索栏 -->
    <van-nav-bar class="van-nav-bar-title" fixed>
      <van-button class="serch_btn" icon="search" round slot="title" to="/serch"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 内容导航栏 -->
    <van-tabs v-model="active" animated swipeable class="channle">
      <!-- <van-tab
        v-for="channel in channleInfo"
        :key="channel.id"
        :title="channel.name"
        :active="active"
      > -->
      <van-tab
        v-for="channel in channleInfo"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 把每个标题对应的内容设置成一个组件 -->
        <artical :channel="channel"></artical>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="humburger" @click="editChannels" is-link>
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelshow"
      class="editChannelBox"
      closeable
      position="bottom"
      round
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <edit-channel
        :editchannel="channleInfo"
        :active="active"
        @active-index="jumpchannel"
        @close-popup="isChannelshow = false"
      ></edit-channel>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import artical from './components/artical'
import EditChannel from '@/components/editChannel'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data() {
    return {
      active: 0,
      channleInfo: [],
      // 编辑频道的弹出框是否显示
      isChannelshow: false
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    // 获取数据渲染后台数据（编辑频道的数据）
    async getChannels() {
      var channelArr = []
      // 如果用户已登录，就调用后台的接口，修改数据
      if (this.user) {
        try {
          const { data: res } = await getUserChannels()
          // console.log(res.data.channels)
          channelArr = res.data.channels
          // console.log(this.channleInfo)
        } catch (err) {
          this.$toast('获取频道列表数据失败', err)
        }
      } else {
        // // 调用本地存储的数据渲染
        var channels = getItem('userChannel')
        // // console.log(getItem('userChannel'))
        // // 如果本地存储里面有数据，就调用本地存储的数据，否则就用后台的接口
        if (channels) {
          channelArr = channels
        } else {
          try {
            const { data: res } = await getUserChannels()
            // console.log(res.data.channels)
            channelArr = res.data.channels
            // console.log(this.channleInfo)
          } catch (err) {
            this.$toast('获取频道列表数据失败', err)
          }
        }
      }
      this.channleInfo = channelArr
    },
    // 编辑频道
    editChannels() {
      this.isChannelshow = true
      // console.log(this.active)
    },
    // 根据后台点击地频道，让当前频道的颜色高亮
    jumpchannel(index, isChannelshow = true) {
      this.active = index
      // console.log(index)
      // this.isChannelshow = false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    artical,
    EditChannel
  }
}
</script>

<style lang="less" scoped>
.home_container {
  margin-bottom: 100px;
  // padding-top: 174px;
}

.serch_btn {
  width: 555px;
  height: 64px;
  border: 0;
  background-color: rgb(91, 171, 251);
  .van-icon {
    font-size: 32px;
    color: #fff;
  }
  .van-button__text {
    font-size: 28px;
    color: #fff;
  }
}
/deep/.van-tabs__wrap {
  position: fixed;
  z-index: 2;
}
/deep/.van-tabs__nav--complete {
  height: 82px;
}

/deep/.channle {
  margin-top: 92px;
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #ccc;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active {
    color: #333;
    margin-top: 8px;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px !important;
    background-color: rgb(59, 155, 250);
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.humburger {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.iconfont {
    font-size: 33px;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
/deep/.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
.van-nav-bar-title {
  width: 100%;
}
/deep/.van-tabs__content--animated {
  padding-top: 85px;
}
/deep/.editChannel {
  padding-top: 90px;
}
</style>
