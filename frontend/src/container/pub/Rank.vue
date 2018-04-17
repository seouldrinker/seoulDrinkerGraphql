<template>
  <div id="pubRankContainer">
    <app-layout>
      <header slot="header">
        <div class="header__text">
          <span class="logo" @click="goAnyWhere(-1)">
            <img src="../../assets/common/back.png" alt="back">
          </span>
          <span class="title">Pub</span>
        </div>
      </header>
      <main slot="contents" v-if="pubRankList">
        <ul>
          <router-link v-for="(data, index) in pubRankList"
            :key="index" :to="`/pub/${data._id}`" tag="li">
            <app-rank
              :image="data.brewery.brand_image || data.brewery.logo_image"
              :name="data.kor_name || data.eng_name"
              :count="data._feedCount"
              :location="data.location"
              :rank="index + 1"
              :isBeer="false"
            />
          </router-link>
        </ul>
      </main>
    </app-layout>
  </div>
</template>

<script>
import apollo from '../../graphql/rank'
import BeerPubRank from '@/components/beerPub/rank/index'
import Layout from '@/layout/index'

export default {
  apollo: {
    pubRankList: apollo.pubRankList
  },
  components: {
    appLayout: Layout,
    appRank: BeerPubRank
  },
  data () {
    return {
      pubRankList: []
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
#pubRankContainer {
  ul:hover {
    cursor: pointer;
  }
}
</style>
