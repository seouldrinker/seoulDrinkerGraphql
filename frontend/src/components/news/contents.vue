<template>
  <div id="newsContents">
    <div class="context">{{ newsContext }}</div>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'

export default {
  props: ['newsContext'],
  data () {
    return {
      static_url: STATIC_URL
    }
  }
}
</script>

<style lang="scss">
  #newsContents {
    padding: 18px;
    .context {
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
    }
  }
</style>
