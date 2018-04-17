<template>
  <div id="beerListContainer">
    <app-layout>
      <header slot="header">
        <div class="header__text">
          <span class="title noBack">Beer</span>
          <router-link :to="`/beer/rank`" tag="span" class="rank">
            <img src="../../assets/common/rank.png" alt="rank">
          </router-link>
        </div>
      </header>
      <main slot="contents" v-if="beerList">
        <ul>
          <li v-for="(beer, index) in beerList" :key="index">
            <app-list-item
              :isBeer="true"
              :data="beer"
              :image="beer.image"
            />
          </li>
        </ul>
      </main>
    </app-layout>
    <app-navigator :isFeed="false" :isPub="false" :isBeer="true" :isNews="false"/>
  </div>
</template>

<script>
import apollo from '../../graphql/beer'
import BeerPubListItem from '@/components/beerPub/list/index'
import Layout from '@/layout/index'
import Navigator from '@/layout/navigator'

export default {
  apollo: {
    beerList: apollo.beerList
  },
  components: {
    appLayout: Layout,
    appNavigator: Navigator,
    appListItem: BeerPubListItem
  },
  data () {
    return {
      beerList: []
    }
  }
}
</script>

<style lang="scss">
#beerListContainer {
  margin: 0 0 50px 0;
}
</style>
