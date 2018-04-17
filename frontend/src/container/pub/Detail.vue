<template>
  <div id="pubDetailContainer">
    <app-layout>
      <header slot="header" class="invisible">
        <div class="header__text">
          <span class="logo" @click="goAnyWhere(-1)">
            <img src="../../assets/common/back.png" alt="back">
          </span>
          <span class="title">Pub</span>
        </div>
      </header>
      <main slot="contents" class="detailHeight" v-if="pubDetail">
        <app-detail-header
          :brandImage="pubDetail.brewery.brand_image"
          :titleImage="pubDetail.brewery.logo_image"
          :engName="pubDetail.eng_name"
          :korName="pubDetail.kor_name"
        />
        <app-detail-info
          :pubLocation="pubDetail.location"
          :pubPhone="pubDetail.phone"
          :pubHomepage="pubDetail.brewery.homepage"
          :pubEst="pubDetail.brewery.est"
          :pubFacebook="pubDetail.brewery.facebook"
          :pubInstagram="pubDetail.brewery.instagram"
        />
        <app-detail-contents
          :about="pubDetail.brewery.about"
          :breweryImage="pubDetail.brewery.brand_image"
          :breweryEngName="pubDetail.brewery.eng_name"
          :breweryKorName="pubDetail.brewery.kor_name"
          :breweryLocation="pubDetail.brewery.location"
          :breweryPhone="pubDetail.brewery.phone"
          :feedList="pubDetail._feedList"
          :rank="getRank()"
        />
      </main>
    </app-layout>
  </div>
</template>

<script>
import apolloPub from '../../graphql/pub'
import apolloRank from '../../graphql/rank'
import BeerPubDetailHeader from '@/components/beerPub/detail/header'
import BeerPubDetailContents from '@/components/beerPub/detail/contents'
import PubDetailInfo from '@/components/pub/detail/info'
import Layout from '@/layout/index'

export default {
  apollo: {
    pubDetail: apolloPub.pubDetail,
    pubRankList: apolloRank.pubRankList
  },
  components: {
    appLayout: Layout,
    appDetailHeader: BeerPubDetailHeader,
    appDetailInfo: PubDetailInfo,
    appDetailContents: BeerPubDetailContents
  },
  data () {
    return {
      pubDetail: null,
      pubRankList: []
    }
  },
  methods: {
    getRank () {
      const that = this
      if (this.pubRankList) {
        const index = this.pubRankList.findIndex((v, k) => {
          return v._id === that.$route.params.id
        })
        return index > -1 ? (index + 1) : '-'
      }
      return '-'
    },
    goAnyWhere (n) {
      return this.$router.go(n)
    }
  }
}
</script>

<style lang="scss">

</style>
