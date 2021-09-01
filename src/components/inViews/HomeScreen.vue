<template>
    <div class="row">
      <div class="col-lg-8">
          <strong class="heading">Your Youtube Friend !</strong>
                  <img src="../../assets/frnd.png" class="img-fluid p-3 mt-5 feature-img" width="400" height="400"  alt="">
      </div>
      <div class="col-lg-4">
 <img width="350" height="350" src="https://cdn.dribbble.com/users/287797/screenshots/2406073/watch_me.gif" alt="" class="img-fluid">
    <button v-if="!isLoggedIn" type="button" class="btn btn-warning"> <router-link class="get_pass" to="/passcode">get passcode</router-link> </button>
<button  v-if="!isLoggedIn" type="button" class="btn btn-info"> <router-link to="/auth">Existing user? Login</router-link> </button>
 <button  v-if="isLoggedIn" type="button" class="btn btn-warning"> <router-link class="get_pass" to="/passcode">donate us</router-link> </button>
 <button  v-if="isLoggedIn" type="button" class="btn btn-info"> <router-link class="" style=color:white to="/list">your pending list</router-link> </button>
<button  v-if="isLoggedIn" @click="logout" type="button" style=color:black class="btn btn-danger"> logout</button>
      </div>
    </div>
</template>

<script>
    export default {
         computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
   
  },
  methods: {
      logout(){
        this.$store.dispatch('logOutAction')
        this.$router.push('/')
        // window.location.reload();
      }
  },
    }
</script>

<style  scoped>
.row{
    margin-top: 4vh;
    margin-left: 10%;
    margin-right: 10%;
    
}
.btn-warning{
    margin-right: 40px;
   
}
.heading{
    display: block;
    font-size: 1.8rem;
    color: rgb(250, 60, 60);
}
button{
    display: block;
    width: 100%;
    margin-top: 10px;
}
.btn-info{
    background: rgb(27, 27, 27);
}
a{
    text-decoration: rgb(251, 255, 6);
    color: rgb(255, 255, 67);
}
a.get_pass{
    color: black;
}
img{
       transition: 1s; 
}
img:hover{

    transform: rotateY(180deg);
}

</style>