<template>
  <div id="beerListContents">
    <div class="style" v-if="data.style">Style : {{ data.style }}</div>
    <div class="abv" v-if="data.abv">ABV : {{ data.abv }}</div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss">
  #beerListContents {
    & > .style, .abv {
      display: inline-block;
    }
  }
</style>
