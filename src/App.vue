<template>
  <div id="app">
 <TheNavbar/>
 <div class="quick_link">
 <QuickLinks class="" />
 </div>

    <router-view/>
  </div>
</template>
<script>
import TheNavbar from './components/boss/TheNavbar.vue'
import QuickLinks from './components/boss/QuickLinks.vue'
export default {
  components:{
    TheNavbar,
    QuickLinks
  },
  created() {
    //  this.$store.dispatch('autoLoginAction')
     let storedUser = localStorage.getItem("passcode");
      if (!!storedUser) {
        this.$store.dispatch("fetchUsersPasscode", { passcode: storedUser });
      }
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

*{
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.router-link-exact-active{
  color: rgb(0, 0, 0) !important;
  font-weight: bolder;
}
.quick_link{
  display: none;
}

@media screen and (max-width:950px) {
  .feature-img{
    display: none;
  }
  .quick_link{
  display: block;
}
}
// @media screen and (min-width:950px) {
 
//   .quick_link{
//   display: block;
// }
// }

</style>
