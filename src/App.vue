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
  },
  created() {
    // this.$store.dispatch('fetchUsersPasscode')
  },
}
</script>
<style lang="scss">

*{
  overflow-x: hidden;
}
</style>
