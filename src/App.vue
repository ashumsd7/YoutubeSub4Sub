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
    //  this.$store.dispatch('autoLoginAction')
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

*{
  overflow-x: hidden;
}

.router-link-exact-active{
  color: rgb(248, 123, 123) !important;
  font-weight: bolder;
}

@media screen and (max-width:950px) {
  .feature-img{
    display: none;
  }
}
</style>
