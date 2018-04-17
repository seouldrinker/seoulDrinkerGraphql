<template>
  <div id="feedContainer">
    <app-layout>
      <main slot="contents" v-if="feedList">
        <ul>
          <li v-for="(feed, index) in feedList" :key="index">
            <app-feed-header
              :userImage="feed.user.picture"
              :userName="feed.user.name"
              :feedNewsDate="feed.udt_dt"
            />
            <app-feed-image
              :feedNewsImage="feed.image"
            />
            <app-feed-contents
              :beers="feed.beers"
              :pub="feed.pub"
              :feedContext="feed.context"
            />
          </li>
        </ul>
      </main>
    </app-layout>
    <app-navigator :isFeed="true" :isPub="false" :isBeer="false" :isNews="false"/>
  </div>
</template>

<script>
import apollo from '../graphql/feed'

import Header from '@/components/feedNews/header'
import Image from '@/components/feedNews/image'
import Contents from '@/components/feed/contents'

import Layout from '@/layout/index'
import Navigator from '@/layout/navigator'

import { STATIC_URL } from '@/config'

export default {
  apollo,
  components: {
    appLayout: Layout,
    appNavigator: Navigator,
    appFeedHeader: Header,
    appFeedImage: Image,
    appFeedContents: Contents
  },
  data () {
    return {
      static_url: STATIC_URL,
      loading: 0,
      feedList: []
    }
  }
}
</script>

<style lang="scss">
#feedContainer {
  margin: 0 0 50px 0;
}
</style>
