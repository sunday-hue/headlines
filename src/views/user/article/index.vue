<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="flag === 0">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="flag === 1">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetails.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetails.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleDetails.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articleDetails.pubdate | relativeTime }}
          </div>
          <!-- <follow-user
            class="follow-btn"
            :isFollow="articleDetails.is_followed"
            :authorID="articleDetails.aut_id"
            @update-follow="articleDetails.is_followed = $event"
          /> -->
          <!-- 使用v-model简化操作 -->
          <!-- v-model固定的两个操作是 -->
          <!-- value:articleDetails.is_followed 接收值 -->
          <!-- @input用来修改组组件传来的值 -->
          <!-- 由于语义化不好，可以在子组件中修改这两个初始的名字 -->
          <follow-user
            class="follow-btn"
            :authorID="articleDetails.aut_id"
            v-model="articleDetails.is_followed"
          />
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          > -->
          <!-- <van-button
            v-if="articleDetails.is_followed"
            @click="followUser"
            class="follow-btn"
            round
            :loading="isLoading"
            size="small"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="badge"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            :loading="isLoading"
            @click="followUser"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleDetails.content"
          ref="imgcotent"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <!-- <van-icon name="comment-o" info="123" color="#777" /> -->
          <van-icon name="comment-o" badge="123" color="#777" />
          <!-- 星星：收藏 -->
          <collect-article
            v-model="articleDetails.is_collected"
            :articleId="articleDetails.art_id"
          />
          <!-- 赞：点赞 -->
          <lick-article
            :articleId="articleDetails.art_id"
            v-model="articleDetails.attitude"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="flag === 2">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="flag === 3">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticles"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
// 引入第三方样式，来修改文章主内容的格式
import './github-markdown.css'
// 引入图片预览功能
import { ImagePreview } from 'vant'
import FollowUser from '@/components/followUser'
import CollectArticle from '@/components/collectArticle'
import LickArticle from '@/components/likeArticle'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LickArticle
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      // 列表详情返回内容
      articleDetails: {},
      // 定义自己的规则
      // 0-页面以打开就显示loding页面
      // 1-当获取文章详情成功后，显示文章内容
      // 文章详情获取失败的时候
      //   2-后端返回404错误，找不到文章，显示资源部承载界面
      //   3-其他错误，显示重新加载界面
      flag: 0,
      // 关注时的loding状态
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticles()
  },
  mounted() {},
  methods: {
    async loadArticles() {
      this.flag = 0
      try {
        const { data } = await getArticles(this.articleId)

        // 模拟网络慢的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('whdgwd')
        // }

        // console.log(data)
        this.articleDetails = data.data

        // 数据加载完成，完成文章内容中的图片点击预览功能
        setTimeout(() => {
          this.runderImg()
        }, 0)

        // 文章详情获取成功，显示内容界面
        this.flag = 1
      } catch (err) {
        this.$toast('获取失败')
        if (err.response && err.response.status === 404) {
          this.flag = 2
        } else {
          this.flag = 3
        }
      }
    },
    // 点击渲染图片
    runderImg() {
      // 获取展示文章内容的节点
      const imgContent = this.$refs.imgcotent
      // console.log(imgContent)
      // 找到内容里面的图片标签
      const imgs = imgContent.querySelectorAll('img')
      // console.log(img)
      // 存储img里src属性的值（图片路径）
      const images = []
      imgs.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            images,
            // 指定图片的初始位置
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar .van-icon,
/deep/.van-nav-bar__title {
  color: #fff !important;
}

.article-container {
  .page-nav-bar {
    background-color: #3296fa;
  }

  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/.van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
