<template>
    <section id="header">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#">
        <img class="img-fluid" width="100" height="100" src="../../assets/ytlogo.png" alt="">  
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" v-if="isLoggedIn">
         <li @click="logout" class="nav-item">
          <a class="btn btn-danger" aria-current="page" href="#">Logout-({{getCurrentUser }}) </a>
        </li>
        
      </ul>
      
      <ul  class="navbar-nav ms-auto">
        <li v-if="isLoggedIn" class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Your Channel</a>
        </li>
        <li v-if="isLoggedIn" class="nav-item ">
          <a class="nav-link" href="#">Pending List</a>
        </li>
        
        
        
        <li class="nav-item">
          <a class="btn btn-warning" href="#">Donate {{isLoggedIn }}</a>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/admin">Admin-Login </router-link>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/"> <u>User-Login</u>  </router-link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </section>
</template>

<script>
    export default {
    methods: {
      logout(){
        this.$store.dispatch('logOutAction')
      }
    },
        computed:{
          isLoggedIn(){
            return this.$store.getters.isLoggedIn;
          },
           getCurrentUser(){
            return this.$store.getters.getCurrentUser;
          },
         
        }
    }
</script>

<style lang="scss" scoped>

</style>