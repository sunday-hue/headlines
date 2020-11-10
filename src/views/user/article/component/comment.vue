<!-- vue 快捷方式 -->
<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.content">{{
        item.content
      }}</van-cell> -->
      <!-- <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
      /> -->
      <comment-item
        v-for="item in list"
        :key="item.art_id"
        :comment="item"
        @reply-pop="$emit('reply-pop', $event)"
      />
    </van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getComments } from '@/api/comment'
import CommentItem from '@/components/comment-item'
export default {
  // 组件的名字
  name: 'commentList',
  // 父子组件传值时使用
  props: {
    // 文章id或文章品论id
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  // props: ['source'],
  data() {
    // 这里存放数据
    return {
      loading: false,
      finished: false,
      offset: null,
      // 总数据条数
      // totalCount: 0,
      limit: 20 // 每页的数量
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 为了在页面中还没显示出页面的时候，就获取到品论数量
    this.onLoad()
  },
  // 方法集合
  methods: {
    async onLoad() {
      try {
        // 1:获取文章评论内容
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // console.log(data.data)
        const { results } = data.data
        // console.log(data.data.total_count)
        // 向父组件中传递评论的数量
        this.$emit('update-comment', data.data.total_count)

        // 2:把文章评论内容添加到list列表中
        this.list.push(...results)
        // console.log(this.list)

        // 3：关闭loding加载状态
        this.loading = false

        // 4:数组里是否有数据
        if (results.length) {
          //    有：重置下一请求的时间
          this.offset = data.data.last_id
        } else {
          //    无：打开finished状态
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {
    CommentItem
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
</style>