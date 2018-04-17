<template>
  <router-link id="beerPubListIndex" :class="isBeer ? 'beerHeader' : 'pubHeader'"
    :to="isBeer ? `/beer/${data._id}` : `/pub/${data._id}`" tag="div">
    <div class="image">
      <img :src="`${static_url}/${image}`" alt="SeoulDrinker">
    </div>
    <div class="beerPubInfo">
      <div class="engName">
        {{ data.eng_name }}
      </div>
      <div class="korName">
        {{ data.kor_name }}
      </div>
      <app-beer-item-contents v-if="isBeer"
        :data="data"
      />
      <app-pub-item-contents v-else
        :data="data"
      />
    </div>
  </router-link>
</template>

<script>
import PubItemContents from '@/components/pub/list/contents'
import BeerItemContents from '@/components/beer/list/contents'

import { STATIC_URL } from '@/config'

export default {
  components: {
    appPubItemContents: PubItemContents,
    appBeerItemContents: BeerItemContents
  },
  props: ['isBeer', 'data', 'image', 'contents'],
  data () {
    return {
      static_url: STATIC_URL
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  #beerPubListIndex {
    padding: 8px 0 0 16px;
    border-bottom: 1px solid #E2E2E2;
    box-sizing: border-box;
    &.beerHeader {
      height: 72px;
    }
    &.pubHeader {
      height: 88px;
      & > .image > img {
        border-radius: 42px;
      }
    }
    &:hover {
      cursor: pointer;
    }
    & > div {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      &.image {
        width: 42px;
        height: 42px;
        margin: 4px 0 0 0;
        font-size: 0;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      &.beerPubInfo {
        margin: 0 0 0 8px;
        & > div {
          margin: 2px 0 0 0;
          &.engName, &.korName {
            font-size: 12px;
            font-weight: 900;
            letter-spacing: -1px;
          }
          &.beerPubOtherInfo {
            color: #4a4a4a;
            font-size: 11px;
            & > .style {
              min-width: 80px;
            }
            & > .abv {
              margin: 0 0 0 20px;
            }
          }
        }
      }
    }
  }
</style>
