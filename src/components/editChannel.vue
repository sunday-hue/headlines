<template>
  <div class="editChannel">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="editbtn"
        plain
        round
        size="small"
        type="warning"
        @click="isEditShow = !isEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in editchannel"
        :key="index"
        @click="editChannel(item, index)"
      >
        <van-icon
          name="close"
          v-show="isEditShow && item.name !== '前端'"
        ></van-icon>
        <!-- <span slot="text" class="text" :class="{ active: index === active }">
          {{ item.name }}</span
        > -->
        <slot name="text" class="text">
          <div :class="{ active: index === active }">{{ item.name }}</div>
        </slot>
        <!-- <span class="text" slot="text">{{ item }}</span> -->
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="commend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        v-for="(item, index) in recommenedChannel"
        :key="index"
        :text="item.name"
        @click="addChannle(item)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel, editUserChannels, delUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  props: {
    editchannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannel: [], // 所有的频道的数据
      isEditShow: false // 控制删除按钮是否显示
    }
  },
  created() {
    this.lodaAllChannle()
  },
  methods: {
    async lodaAllChannle() {
      try {
        // 获取所有登陆时的所有频道，来计算频道推荐里面的频道
        const { data } = await getAllChannel()
        // console.log(data)
        this.allChannel = data.data.channels
        // console.log(this.allChannel)
        // this.$toast('获取所有的列表数据成功')
      } catch (err) {
        this.$toast('获取频道列表失败')
      }
    },
    // 我的频道里面的编辑频道(删除频道数据)
    async editChannel(channel, index) {
      // console.log(this.active)

      // console.log(channel, index)
      // 判断当isEditShow=true，修改按钮就会显示
      if (this.isEditShow) {
        // 删除（编辑）频道
        // 规定不能删除name是前端的频道
        if (channel.name === '前端') {
          return null
        }
        // 删除时，当当前点击的频道的index(索引)小于之前点击地频道的索引时
        if (index <= this.active) {
          this.$emit('active-index', this.active - 1)
        }
        this.editchannel.splice(index, 1)

        // 用户登录就调用后台就调用后台接口修改数据
        this.deleteChannels(channel.id)
      } else {
        // // 跳转频道
        this.$emit('active-index', index)
        this.$emit('close-popup')
      }
    },
    // deleteChannels 删除用户频道列表
    async deleteChannels(id) {
      // 已登录，把数据存储到后台
      try {
        if (this.user) {
          await delUserChannel(id)
        } else {
          // 用户未登录 把修改（删除）的频道存储到本地 (数据持久化存储)
          setItem('userChannel', this.editchannel)
        }
      } catch (err) {
        this.$toast('删除用户频道数据失败')
      }
    },
    // 添加频道
    async addChannle(channel) {
      this.editchannel.push(channel)

      if (this.user) {
        try {
          // 用户已登录，调用后台接口
          await editUserChannels({
            id: channel.id, // 频道id
            seq: this.editchannel.length // 顺序序号
          })
          // console.log(data)
          // this.$toast('更新频道数据成功')
        } catch (err) {
          this.$toast('更新频道数据失败', err)
        }
      } else {
        // 用户未登录，把修改的数据存储到本地
        setItem('userChannel', this.editchannel)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道的数据
    recommenedChannel() {
      return this.allChannel.filter((channel) => {
        return !this.editchannel.find((edit) => edit.id === channel.id)
      })

      // 先定义一个可以接收数据的空数组
      //   const arr = []
      //   // 对所有的获取到的所有频道进行遍历
      //   this.allChannel.forEach((channel) => {
      //     // consoel.log(channel)
      //     // if () {
      //     // }
      //     // if(channel.id===)
      //     // 对编辑里面的频道进行查找
      //     // find返回的查找到的第一个数据的值，如果找不到就返回undefined
      //     const i = this.editchannel.find((edit) => {
      //       return channel.id === edit.id
      //     })
      //     // consoel.log(i)
      //     if (!i) {
      //       arr.push(channel)
      //     }
      //   })
      //   return arr
      // }
    }
  }
}
</script>

<style lang="less" >
.editChannel {
  padding: 90px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }

  .van-grid {
    .van-grid-item {
      padding-right: 0 !important;
      .van-grid-item__content {
        background-color: #f4f5f6;
        margin: 0 13px;
        width: 145px;
        height: 86px;
        white-space: nowrap;
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .van-icon-close {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 999;
        font-size: 30px;
        color: #cacaca;
        width: 24px;
        height: 24px;
      }
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        // color: #f85959;
        margin-top: 0;
      }
      .active {
        color: #f85959;
      }
      .van-icon-plus {
        font-size: 24px;
        margin-right: 6px;
      }
    }
  }
  .commend-grid {
    .van-grid-item__content {
      flex-direction: row;
    }
  }
}
</style>