<template>
  <div id="beerRankContainer">
    <app-layout>
      <header slot="header">
        <div class="header__text">
          <span class="logo" @click="goAnyWhere(-1)">
            <img src="../../assets/common/back.png" alt="back">
          </span>
          <span class="title">Beer</span>
        </div>
      </header>
      <main slot="contents" v-if="beerRankList">
        <ul>
          <router-link v-for="(data, index) in beerRankList"
            :key="index" :to="`/beer/${data._id}`" tag="li">
            <app-rank
              :image="data.image"
              :name="data.kor_name || data.eng_name"
              :count="data._feedCount"
              :rank="index + 1"
              :isBeer="true"
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
    beerRankList: apollo.beerRankList
  },
  components: {
    appLayout: Layout,
    appRank: BeerPubRank
  },
  data () {
    return {
      beerRankList: []
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
#beerRankContainer {
  ul:hover {
    cursor: pointer;
  }
}
</style>
