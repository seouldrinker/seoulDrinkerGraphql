<template>
  <div id="beerPubRankContainer">
    <span class="rank" :class="rank === 1 && `best`" v-if="rank > 0">{{ rank }}</span>
    <span class="rank" v-else>-</span>
    <span class="image" :class="rank === 1 && `best`">
      <img :src="`${static_url}/${image}`" alt="rank" :class="!isBeer && `pub`">
    </span>
    <span class="info" v-if="isBeer">#{{ name }}</span>
    <span class="info" v-else>
      <div class="name">
        {{ name }}
      </div>
      <div class="location">
        {{ location }}
      </div>
    </span>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['isBeer', 'image', 'name', 'count', 'rank', 'location'],
  data () {
    return {
      static_url: STATIC_URL
    }
  },
  methods: {
    goAnyWhere (n) {
      return this.$router.go(n)
    }
  }
}
</script>

<style lang="scss">
#beerPubRankContainer {
  padding: 8px 20px;
  border-bottom: 1px solid #e2e2e2;
  & > span {
    display: inline-block;
    vertical-align: middle;
    &.rank {
      width: 20px;
      font-size: 12px;
      font-weight: 600;
      &.best {
        color: #ee741b;
      }
    }
    &.image {
      width: 46px;
      height: 46px;
      margin: 0 0 0 4px;
      &.best {
        & > img {
          border: 2px solid #ee741b;
          box-sizing: border-box;
        }
      }
      & > img {
        width: 100%;
        height: 100%;
        &.pub {
          border-radius: 46px;
        }
      }
    }
    &.info {
      max-width: 110px;
      margin: 0 0 0 10px;
      overflow-x: scroll;
      white-space: nowrap;
      font-size: 12px;
      font-weight: 900;
      & > .name {

      }
      & > .location {
        color: #949494;
      }
    }
    &.count {
      float: right;
      margin: 14px 0 0 0;
      color: #4a4a4a;
      font-size: 12px;
      font-weight: 900;
      &:after {
        content: '';
        display: table;
        clear: both;
      }
    }
  }
}
</style>
