<template>
  <div id="beerPubDetailContents">
    <section class="about">
      <div class="title">ABOUT</div>
      <div class="about__context">{{ about }}</div>
    </section>
    <section class="brewery">
      <div class="title">BREWERY</div>
      <div class="brewery__contents">
        <span>
          <img :src="`${static_url}/${breweryImage}`" alt="breweryImage">
        </span>
        <span class="contents">
          <div class="contents__eng_name" v-if="breweryEngName">{{ breweryEngName }}</div>
          <div class="contents__kor_name" v-if="breweryKorName">{{ breweryKorName }}</div>
          <div v-if="breweryLocation">{{ breweryLocation }}</div>
          <div v-if="breweryPhone">{{ breweryPhone }}</div>
        </span>
      </div>
    </section>
    <section class="ranking">
      <div class="ranking__titles">
        <span class="rank">
          <img src="../../../assets/common/black_rank.png" alt="rank">
        </span>
        <span class="level" v-if="rank">랭킹 {{ rank }}위</span>
        <span class="count" v-if="feedList">{{ feedList.length }}번 벌컥!!</span>
      </div>
      <div class="ranking__images">
        <ul>
          <li v-for="(feed, index) in feedList" :key="index">
            <img :src="`${static_url}/${feed.image}`" alt="feedImage">
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['about', 'breweryImage', 'breweryEngName', 'breweryKorName',
    'breweryLocation', 'breweryPhone', 'feedList', 'rank'],
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
#beerPubDetailContents {
  & .title {
    font-size: 12px;
    font-weight: 600;
  }
  & > .about {
    margin: 14px 10px 0 10px;
    padding: 0 4px 16px 4px;
    border-bottom: 1px solid #E7E7E7;
    & > .about__context {
      margin: 12px 0 0 0;
      line-height: 18px;
      font-size: 12px;
      color: #4a4a4a;
    }
  }
  & > .brewery {
    margin: 14px 10px 0 10px;
    padding: 0 4px 16px 4px;
    border-bottom: 1px solid #E7E7E7;
    & > .brewery__contents {
      margin: 14px 0 0 0;
      & > span {
        display: inline-block;
        vertical-align: top;
        &.contents {
          margin: 0 0 0 8px;
          & > div {
            margin: 2px 0 0 0;
            font-size: 11px;
            color: #949494;
            &.contents__eng_name {
              color: #000;
              font-weight: 800;
            }
            &.contents__kor_name {
              color: #000;
              font-weight: 400;
            }
          }
        }
        & > img {
          width: 42px;
          height: 42px;
          border-radius: 42px;
        }
      }
    }
  }
  & > .ranking {
    margin: 14px 10px 0 10px;
    padding: 0 0 16px 0;
    & > .ranking__titles {
      padding: 0 4px;
      & > span {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        &.rank {
          width: 10px;
          height: 18px;
        }
        &.level {
          margin: 0 0 0 14px;
          font-weight: 900;
        }
        &.count {
          margin: 0 0 0 4px;
          font-weight: 600;
          color: #ee741b;
        }
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    & > .ranking__images {
      margin: 10px 0 0 0;
      & > ul {
        font-size: 0;
        & > li {
          display: inline-block;
          width: 98px;
          height: 98px;
          margin: 2px;
          font-size: 0;
          & > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
