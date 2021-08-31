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

*{
  overflow-x: hidden;
}
.row{
    margin-top: 20vh;
    margin-left: 10%;
    margin-right: 10%;
    
}
.router-link-exact-active{
  color: rgb(248, 123, 123) !important;
  font-weight: bolder;
}
</style>
