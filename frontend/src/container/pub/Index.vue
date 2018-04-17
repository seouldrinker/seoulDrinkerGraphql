<template>
  <div id="pubListContainer">
    <app-layout>
      <header slot="header">
        <div class="header__text">
          <span class="title noBack">Pub</span>
          <router-link :to="`/pub/rank`" tag="span" class="rank">
            <img src="../../assets/common/rank.png" alt="rank">
          </router-link>
        </div>
      </header>
      <main slot="contents" v-if="pubList">
        <ul>
          <li v-for="(pub, index) in pubList" :key="index">
            <app-list-item
              :isBeer="false"
              :data="pub"
              :image="pub.brewery.logo_image || pub.brewery.brand_image"
            />
          </li>
        </ul>
      </main>
    </app-layout>
    <app-navigator :isFeed="false" :isPub="true" :isBeer="false" :isNews="false"/>
  </div>
</template>

<script>
import apollo from '../../graphql/pub'
import BeerPubListItem from '@/components/beerPub/list/index'
import Layout from '@/layout/index'
import Navigator from '@/layout/navigator'

export default {
  apollo: {
    pubList: apollo.pubList
  },
  components: {
    appLayout: Layout,
    appNavigator: Navigator,
    appListItem: BeerPubListItem
  },
  data () {
    return {
      pubList: []
    }
  }
}
</script>

<style lang="scss">
#pubListContainer {
  margin: 0 0 50px 0;
}
</style>
