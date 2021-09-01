<template>
    <div class="sharing mt-5">
        <div class="row">
            <div class="heading text-center">
                Share your link to help others.
            </div>
        </div>
        <hr>
        <div class="row">
            <p class="sharing-about text-center px-3">
                When other people open your link they will submit their channel links and those links will appear in your  <router-link to="/list" >list</router-link>. You will subscribe those channels and earn points.
                
            </p>
        </div>
    
          <div class="hello text-center">
    <facebook :url="url" scale="3"></facebook>
    <twitter :url="url" title="Check me on Github" scale="3"></twitter>
  
    <telegram :url="url" scale="3"></telegram>
    <whats-app :url="url" title="Hello" scale="3"></whats-app>
    
   
 
   
  </div>
    </div>
</template>

<script>
import {
  Facebook,
  Twitter,
  Telegram,
  WhatsApp,
} from "vue-socialmedia-share";
    export default {
        components: {
    Facebook,
    Twitter,
    Telegram,
    WhatsApp,
    
  },
  data() {
      return {
          
      }
  },
  computed:{
          
           getCurrentUser(){
            return this.$store.getters.getCurrentUser;
          },
          prepareLink(){
              return 'https://getsub4sub.netlify.app/entry/'
          },
          url(){
              if(this.getCurrentUser!==undefined){
                   return ` Hey I will subscribe you channel. Here is my link just paste or type your channel link. This will appear in my msg and I will subscribe it. Click this link https://getsub4sub.netlify.app/entry/${this.getCurrentUser}`
              }
              else{
                  return 'Hey I got this awesome website to increase my Youtube Subscribers. It is used by more than 100 users and it is free. To use it Click: https://getsub4sub.netlify.app/ '
              }
            
          }
         
        }
    }
</script>

<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello > span {
  padding: 1em;
}

.heading {
  font-size: 1.5rem;
  color: rgb(250, 60, 60);
  font-weight: 600;
}
.sharing-about{
    font-size: 1.1rem;
    color: rgb(114, 109, 109);
    font-family: 'Roboto', sans-serif;
    /* padding: 0 3rem; */
}
</style>