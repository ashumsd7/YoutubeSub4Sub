<template>
<div id="home">

<home-screen></home-screen>
<SocialSharing/>
</div>
</template>

<script>
// @ is an alias to /src


import HomeScreen  from '../components/inViews/HomeScreen.vue'
import SocialSharing  from '../components/inViews/SocialSharing.vue'
export default {
  name: 'Home',
  components: {
HomeScreen,
SocialSharing
  
  }
}
</script>
