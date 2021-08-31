<template>
  <div id="app">
 <TheNavbar/>
    <router-view/>
  </div>
</template>
<script>
import TheNavbar from './components/boss/TheNavbar.vue'
export default {
  components:{
    TheNavbar
  }
}
</script>
<style lang="scss">

*{
  overflow-x: hidden;
}
</style>
