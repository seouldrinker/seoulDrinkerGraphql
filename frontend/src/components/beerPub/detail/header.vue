<template>
  <div id="beerPubDetailHeader">
    <section class="brandImage">
      <img :src="`${static_url}/${brandImage}`" :alt="engName">
    </section>
    <section class="title">
      <span class="title__image">
        <img :src="`${static_url}/${titleImage}`" :alt="engName" />
      </span>
      <span class="title__names">
        <div class="eng">
          {{ engName }}
        </div>
        <div class="kor">
          {{ korName }}
        </div>
      </span>
    </section>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['brandImage', 'titleImage', 'engName', 'korName'],
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
  #beerPubDetailHeader {
    width: 100%;
    & > .brandImage {
      font-size: 0;
      & > img {
        width: 100%;
        min-height: 130px;
        max-height: 300px;
      }
    }
    & > .title {
      position: relative;
      height: 75px;
      margin: 0 10px;
      border-bottom: 1px solid #E7E7E7;
      & > span {
        display: inline-block;
        &.title__image {
          position: absolute;
          top: -38px;
          left: 8px;
          width: 100px;
          height: 100px;
          font-size: 0;
          & > img {
            width: 100%;
            height: 100%;
            border: 4px solid #F5EFE3;
            border-radius: 100px;
            box-sizing: border-box;
          }
        }
        &.title__names {
          margin: 12px 0 0 125px;
          & > .eng {
            color: #AFAFAF;
            font-size: 14px;
            font-weight: 400;
          }
          & > .kor {
            margin: 2px 0 0 0;
            font-size: 16px;
            font-weight: 900;
          }
        }
      }
    }
  }
</style>
