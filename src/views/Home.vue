<template>
<div id="home">

<Login></Login>
</div>
</template>

<script>
// @ is an alias to /src


import Login  from '../components/user/Login.vue'
export default {
  name: 'Home',
  components: {

  Login
  }
}
</script>
