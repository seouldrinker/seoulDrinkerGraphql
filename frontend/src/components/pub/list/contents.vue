<template>
  <div id="pubListContents">
    <div class="location" v-if="data.location">{{ data.location }}</div>
    <div class="phone" v-if="data.phone">{{ data.phone }}</div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss">

</style>
