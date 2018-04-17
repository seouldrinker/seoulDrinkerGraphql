<template>
  <section id="beerDetailInfo">
    <div class="info" v-if="beerFeature">
      <span class="info__title">특징</span>
      <span class="info__contents">{{ beerFeature }}</span>
    </div>
    <div class="info" v-if="beerStyle">
      <span class="info__title">스타일</span>
      <span class="info__contents">{{ beerStyle }}</span>
    </div>
    <div class="info" v-if="beerRelease">
      <span class="info__title">출시일</span>
      <span class="info__contents">{{ beerRelease }}</span>
    </div>
    <div class="info" v-if="beerAbv">
      <span class="info__title">ABV</span>
      <span class="info__contents">{{ beerAbv }}</span>
    </div>
  </section>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['beerFeature', 'beerStyle', 'beerRelease', 'beerAbv'],
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
  #beerDetailInfo {
    margin: 0 10px;
    padding: 6px 0 12px 0;
    border-bottom: 1px solid #E7E7E7;
    & > .info {
      & > span {
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        &.info__title {
          width: 48px;
          color: #949494;
        }
        &.info__contents {
        }
      }
    }
  }
</style>
