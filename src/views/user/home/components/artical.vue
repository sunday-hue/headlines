<template>
  <div class="artical-list">
    <!-- 下拉选新的组件 -->
    <van-pull-refresh
      :success-text="refreshSucccess"
      v-model="isRefresh"
      success-duration="1500"
      @refresh="onRefresh"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        > -->
        <artical-item
          :article="item"
          :key="index"
          v-for="(item, index) in list"
        ></artical-item>
        <!-- </van-cell> -->
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticalItem from '@/components/artical-item'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储数据
      loading: false, // 是否显示加载的提示
      finished: false, // 是否显示完成的提示
      timestamp: 0, // 下一页文章加载的时间
      isRefresh: false, // 下拉刷新
      refreshSucccess: '', // 刷新成功后显示的数据
      error: false // 当数据加载错误的时候，显示加载错误的信息
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 1:获取频道数据
      try {
        // console.log(this.timestamp)

        const { data } = await getArticle({
          channel_id: this.channel.id, // 当前频道的id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          // timestamp: 1604566074587,
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 2:把请求数据的结果添加到list数组
        this.list.push(...data.data.results)
        // console.log(data)

        // 模拟加载失败的情况
        // if (Math.random > 0.5) {
        //   JSON.parse('smhdsdisu')
        // }

        // 3: 本次数据加载结束后，要把加载的状态设置为结束
        this.loading = false

        // 4:判断数据是否全部加载完成
        if (this.list.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        // this.$toast('获取文章列表数据失败')
        this.error = true
        // 关闭加载的提示
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id, // 当前频道的id
          timestamp: Date.now(),
          // timestamp: 1604566074587,
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // if (Math.random > 0.1) {
        //   JSON.parse('smhdsdisu')
        // }

        // 模拟刷新失败的情况
        const { results } = data.data
        // 把刷新获取到的数据在头部显示
        this.list.unshift(...results)
        this.refreshSucccess = `刷新成功，新添加了${results.length}条数据`
        // 关闭刷新的按钮
        this.isRefresh = false
      } catch (err) {
        // console.log('刷新失败')
        this.error = false
        // 关闭刷新的按钮
        this.isRefresh = false
      }
    }
  },
  components: {
    ArticalItem
  }
}
</script>

<style lang="less" scoped>
.artical-list {
  height: 79vh;
  overflow-y: auto;
}
</style>