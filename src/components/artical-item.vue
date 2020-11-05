<template>
  <van-cell-group>
    <!-- <van-cell @click="to"></van-cell> -->
    <van-cell class="artical-item">
      <!-- <slot name="title">{{ article.title }}</slot> -->
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <!-- <van-cell v-if="article.cover.type === 3"> -->
      <!-- <div slot="default" :key="i" v-for="(img, i) in article.cover.images">
          <van-image width="100" height="100" :src="img" />
        </div> -->
      <!-- <slot name="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </slot> -->
      <div slot="lable" class="cover_lable">
        <div v-if="article.cover.type === 3" class="cover_img">
          <div
            v-for="(item, index) in article.cover.images"
            :key="index"
            class="cover_item"
            fit="cover"
          >
            <van-image :src="item" class="cover_item_img" />
          </div>
        </div>
      </div>
      <div slot="label" class="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    to() {
      console.log(this.article)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
/deep/.artical-item {
  position: relative;

  .van-cell__title {
    color: #3a3a3a;
    font-size: 32px;
  }
  .label {
    color: #b4b4b4;
    span {
      padding-right: 24px;
    }
  }
  .van-cell__value {
    flex: unset;
    width: 230px;
    height: 150px;

    .van-image {
      width: 230px;
      height: 150px;
      padding-left: 25px;
    }
  }
  .cover_item {
    display: flex;
    .cover_item_img {
      flex: 1;
      width: 100px;
      height: 150px;
      padding: 0 2px;
      margin: 30px 0;
    }
  }
}
</style>