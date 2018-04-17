<template>
  <div id="beerDetailContainer">
    <app-layout>
      <header slot="header" class="invisible">
        <div class="header__text">
          <span class="logo" @click="goAnyWhere(-1)">
            <img src="../../assets/common/back.png" alt="back">
          </span>
          <span class="title">Beer</span>
        </div>
      </header>
      <main slot="contents" class="detailHeight" v-if="beerDetail">
        <app-detail-header
          :brandImage="beerDetail.brewery.brand_image"
          :titleImage="beerDetail.brewery.logo_image"
          :engName="beerDetail.eng_name"
          :korName="beerDetail.kor_name"
        />
        <app-detail-info
          :beerFeature="beerDetail.feature"
          :beerStyle="beerDetail.style"
          :beerRelease="beerDetail.release"
          :beerAbv="beerDetail.abv"
        />
        <app-detail-contents
          :about="beerDetail.brewery.about"
          :breweryImage="beerDetail.brewery.brand_image"
          :breweryEngName="beerDetail.brewery.eng_name"
          :breweryKorName="beerDetail.brewery.kor_name"
          :breweryLocation="beerDetail.brewery.location"
          :breweryPhone="beerDetail.brewery.phone"
          :feedList="beerDetail._feedList"
          :rank="getRank()"
        />
      </main>
    </app-layout>
  </div>
</template>

<script>
import apolloBeer from '../../graphql/beer'
import apolloRank from '../../graphql/rank'
import BeerPubDetailHeader from '@/components/beerPub/detail/header'
import BeerPubDetailContents from '@/components/beerPub/detail/contents'
import BeerDetailInfo from '@/components/beer/detail/info'
import Layout from '@/layout/index'

export default {
  apollo: {
    beerDetail: apolloBeer.beerDetail,
    beerRankList: apolloRank.beerRankList
  },
  components: {
    appLayout: Layout,
    appDetailHeader: BeerPubDetailHeader,
    appDetailInfo: BeerDetailInfo,
    appDetailContents: BeerPubDetailContents
  },
  data () {
    return {
      beerDetail: null,
      beerRankList: []
    }
  },
  methods: {
    getRank () {
      const that = this
      if (this.beerRankList) {
        const index = this.beerRankList.findIndex((v, k) => {
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
