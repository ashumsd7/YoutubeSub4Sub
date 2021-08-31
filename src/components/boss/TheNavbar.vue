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
     
      
      <ul  class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">home</router-link>
        </li>
       
        <li v-if="isLoggedIn" class="nav-item ">
          <a class="nav-link" href="#"> list</a>
        </li>
        
        
        
        

        <li class="nav-item">
          <router-link class="nav-link" to="/admin">admin </router-link>
        </li>
         <li v-if="isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/entry/1123"> entry</router-link>
        </li>
         
        <li class="nav-item">
          <a class="nav-link" href="#">donate</a>
        </li>
        
      </ul>
       <ul class="navbar-nav" v-if="isLoggedIn">
         <li @click="logout" class="nav-item">
          <a class="nav-link" aria-current="page" href="#"><span class="mt-2 badge bg-danger">logout ({{getCurrentUser }})</span> </a>
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

<style  scoped>
.bg-dark {
    background: linear-gradient(230deg,#030fb8 ,rgb(179, 230, 253)) !important;
}
</style>