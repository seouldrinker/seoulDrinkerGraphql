<template>
  <div id="feedNewsImage">
    <img :src="`${static_url}/${feedNewsImage}`" alt="SeoulDrinker">
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['feedNewsImage'],
  data () {
    return {
      static_url: STATIC_URL
    }
  }
}
</script>

<style lang="scss">
  #feedNewsImage {
    font-size: 0;
    img {
      width: 100%;
    }
  }
</style>
