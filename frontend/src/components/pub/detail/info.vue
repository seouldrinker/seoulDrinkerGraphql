<template>
  <section id="pubDetailInfo">
    <div class="info" v-if="pubLocation">
      <span class="info__title">
        <img src="../../../assets/pub/location.png" alt="location" class="location">
      </span>
      <span class="info__contents">{{ pubLocation }}</span>
    </div>
    <div class="info" v-if="pubPhone">
      <span class="info__title">
        <img src="../../../assets/pub/phone.png" alt="phone" class="phone">
      </span>
      <span class="info__contents">{{ pubPhone }}</span>
    </div>
    <div class="info" v-if="pubHomepage">
      <span class="info__title">
        <img src="../../../assets/pub/site.png" alt="site" class="site">
      </span>
      <span class="info__contents">
        <span><a :href="pubHomepage" target="_blank">{{ pubHomepage }}</a></span>
      </span>
    </div>
    <div class="info" v-if="pubEst">
      <span class="info__title">
        <img src="../../../assets/pub/create.png" alt="create" class="create">
      </span>
      <span class="info__contents">{{ pubEst }}</span>
    </div>
    <div class="info" v-if="pubFacebook || pubInstagram">
      <span class="info__title">
        <img src="../../../assets/pub/sns.png" alt="sns" class="sns">
      </span>
      <span class="info__contents">
        <span><a :href="pubFacebook" target="_blank">Facebook</a></span>
        <span><a :href="pubInstagram" target="_blank">Instagram</a></span>
      </span>
    </div>
  </section>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['pubLocation', 'pubPhone', 'pubHomepage', 'pubEst', 'pubFacebook', 'pubInstagram'],
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
  #pubDetailInfo {
    margin: 0 10px;
    padding: 6px 4px 12px 4px;
    border-bottom: 1px solid #E7E7E7;
    & > .info {
      margin: 2px 0 0 0;
      & > span {
        display: inline-block;
        &.info__title {
          width: 18px;
          margin: 0 10px 0 0;
          text-align: center;
          font-size: 0;
          & > img {
            &.location {
              width: 12px;
              height: 16px;
            }
            &.phone {
              width: 14px;
              height: 14px;
            }
            &.site {
              width: 14px;
              height: 14px;
            }
            &.create {
              width: 16px;
              height: 16px;
            }
            &.sns {
              width: 18px;
              height: 10px;
            }
          }
        }
        &.info__contents {
          margin: 1px 0 0 0;
          vertical-align: top;
          font-size: 12px;
          font-weight: 600;
          & > span {
            margin: 0 8px 0 0;
            & > a {
              text-decoration: none;
              color: #eea51b;
            }
          }
        }
      }
    }
  }
</style>
