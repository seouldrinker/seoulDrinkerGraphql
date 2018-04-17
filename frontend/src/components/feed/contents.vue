<template>
  <div id="feedContents">
    <div class="pub">
      <router-link :to="`/pub/${pub._id}`" tag="span">
        {{ pub.kor_name || pub.eng_name }}
      </router-link>
    </div>
    <ul class="beers">
      <li v-for="(beer, index) in beers" :key="index">
        <router-link :to="`/beer/${beer._id}`" tag="span">
          #{{ beer.kor_name || beer.eng_name }}
        </router-link>
      </li>
    </ul>
    <div class="context">{{ feedContext }}</div>
  </div>
</template>

<script>
export default {
  props: ['beers', 'pub', 'feedContext'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  #feedContents {
    padding: 14px 15px;
    & > .pub {
      margin: 0 0 0 28px;
      font-size: 12px;
      font-weight: 800;
      &:before {
        content: '';
        position: absolute;
        left: 15px;
        display: inline-block;
        width: 16px;
        height: 20px;
        background-image: url(../../assets/feed/feed_place.png);
        background-size: 16px 20px;
      }
      & > span {
        display: inline-block;
        vertical-align: top;
        &:hover {
          cursor: pointer;
        }
      }
    }
    & > .beers {
      margin: 10px 0 0 28px;
      overflow-x: scroll;
      white-space: nowrap;
      &:before {
        content: '';
        position: absolute;
        left: 15px;
        display: inline-block;
        width: 18px;
        height: 20px;
        background-image: url(../../assets/feed/feed_beer.png);
        background-size: 18px 20px;
      }
      & > li {
        display: inline-block;
        padding: 2px;
        margin: 0 4px 0 0;
        vertical-align: top;
        font-size: 12px;
        font-weight: 600;
        background-color: #FBE8C6;
        & > span {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    & > .context {
      margin: 10px 0 0 0;
      font-size: 14px;
      font-weight: 500;
      word-spacing: -2px;
    }
  }
</style>
