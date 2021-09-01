<template>
    <div class="row">
        <ul class="d-flex justify-content-center align-items-center">
          
             <li :key="links.title" v-for="links in quickLinks" class="mx-2"> <router-link :to=links.to > {{links.title}}</router-link></li>
         <li @click="logout" v-if="isLoggedIn" >
          <a  class="nav-link" aria-current="page">logout ({{getCurrentUser | shortUser }})</a>
        </li>
        <li  v-if="!isLoggedIn" >
          <router-link  to="/auth"> login </router-link>
        </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                quickLinks:[
                 
                    { to:'/', title:'home'},
                       { to:'/list', title:'list'},
                    { to:'/donate', title:'donate'},
                ]
            }
        },
         computed:{
         
           getCurrentUser(){
            return this.$store.getters.getCurrentUser;
          },
          isLoggedIn(){
            return this.$store.getters.isLoggedIn;
          },
         
        },
          methods: {
      logout(){
        this.$store.dispatch('logOutAction')
         localStorage.removeItem('passcode')
        this.$router.push('/')
        // window.location.reload();
      }
    },
     filters:{
          shortUser(user){
            user= user.split('')
            user.splice(0,user.length/2,'XX');
            return user.join('')
          }
        }
    }
</script>

<style scoped>
.row{
     background: linear-gradient(230deg,#cedbff ,rgb(181, 120, 255)) !important;
    color: white;
}
li a{
    color: white;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
}
li:last-child a{
    color: rgb(253, 66, 66);
}
</style>