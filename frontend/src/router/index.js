import Vue from 'vue'
import Router from 'vue-router'

import Feed from '@/container/Feed'
import Pub from '@/container/Pub/index'
import PubDetail from '@/container/Pub/Detail'
import PubRank from '@/container/Pub/Rank'
import Beer from '@/container/Beer/index'
import BeerDetail from '@/container/Beer/Detail'
import BeerRank from '@/container/Beer/Rank'
import News from '@/container/News'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/pub',
      name: 'Pub',
      component: Pub
    },
    {
      path: '/pub/rank',
      name: 'PubRank',
      component: PubRank
    },
    {
      path: '/pub/:id',
      name: 'PubDetail',
      component: PubDetail
    },
    {
      path: '/beer',
      name: 'Beer',
      component: Beer
    },
    {
      path: '/beer/rank',
      name: 'BeerRank',
      component: BeerRank
    },
    {
      path: '/beer/:id',
      name: 'BeerDetail',
      component: BeerDetail
    },
    {
      path: '/news',
      name: 'News',
      component: News
    }
  ]
})
