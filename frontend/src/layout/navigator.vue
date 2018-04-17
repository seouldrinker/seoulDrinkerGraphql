<template>
  <div id="commonNavigator">
    <router-link :to="`/`" tag="span" class="feed">
      <div class="feed__image image">
        <img v-if="isFeed" src="../assets/common/yellow_feed.png" alt="feed">
        <img v-else src="../assets/common/feed.png" alt="feed">
      </div>
      <div class="title" :class="isFeed && 'choice'">FEED</div>
    </router-link>
    <router-link :to="`/pub`" tag="span" class="pub">
      <div class="pub__image image">
        <img v-if="isPub" src="../assets/common/yellow_pub.png" alt="pub">
        <img v-else src="../assets/common/pub.png" alt="pub">
      </div>
      <div class="title" :class="isPub && 'choice'">PUB</div>
    </router-link>
    <span>
      <div class="push__image image push-btn">
        <img src="../assets/push/disable.png" alt="push" class="image1">
        <img src="../assets/push/enable.png" alt="push" class="image2" style="display: none;">
      </div>
    </span>
    <router-link :to="`/beer`" tag="span" class="beer">
      <div class="beer__image image">
        <img v-if="isBeer" src="../assets/common/yellow_beer.png" alt="beer">
        <img v-else src="../assets/common/beer.png" alt="beer">
      </div>
      <div class="title" :class="isBeer && 'choice'">BEER</div>
    </router-link>
    <router-link :to="`/news`" tag="span" class="news">
      <div class="news__image image">
        <img v-if="isNews" src="../assets/common/yellow_news.png" alt="news">
        <img v-else src="../assets/common/news.png" alt="news">
      </div>
      <div class="title" :class="isNews && 'choice'">NEWS</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['isFeed', 'isPub', 'isBeer', 'isNews']
}
</script>

<style lang="scss">
#commonNavigator {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  padding: 10px 0 0 0;
  background-color: #fff;
  box-shadow: 0 0 10px #4a5156;
  font-size: 0;
  & > span {
    display: inline-block;
    width: calc(100% / 5);
    vertical-align: top;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
    & > div {
      margin: 0 auto;
      font-size: 0;
      &.image {
        &.feed__image {
          width: 18px;
          height: 16px;
        }
        &.pub__image {
          width: 20px;
          height: 16px;
        }
        &.beer__image {
          width: 16px;
          height: 20px;
        }
        &.news__image {
          width: 18px;
          height: 20px;
        }
        &.push__image {
          & > img {
            width: 30px;
          }
        }
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      &.title {
        margin: 6px 0 0 0;
        color: #bcbcbc;
        font-size: 10px;
        &.choice {
          color: #eea51b;
        }
      }
    }
  }
}
</style>
