<template>
   <div class="row">
  
     <h4 class="heading2 text-center mt-2">  Requests List for subscribtions </h4>
    
     <small class="text-center">Subscribe these channels and help and win points. 
       <strong class="d-block">Total Points: {{totoalSubscribed }}/40*</strong> </small>
       <small class="text-center"> 1 point = ₹1</small>
       <small class="text-center text-danger">After 40 points you will require a premium subscribtion of sub4sub.</small>
     <hr>
     <small  class="ms-auto text-center " > Showing {{getAllLinks.length}}  Requests</small>


       <table class="table ">
  <thead>
    <tr>
      <th class="text-center" scope="col">s.no.</th>
      <th  scope="col">links received</th>
      <th class="text-center" scope="col">requested at</th>
   
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in getAllLinks" :key="item.id">
      <td class="text-center" scope="row"><span class="badge bg-dark">{{item.id}} </span></td>
      <td @click="rewardIt(item.links)"><a class="links" target="_blank" :href="item.links">  {{ item.links | shortLink}}</a></td>
      <td class="text-center"><small>{{ item.date}}</small></td>
    
    </tr>
   
  </tbody>
</table>

   </div>
</template>

<script>

    export default {

        computed:{
          getAllLinks(){
            return this.$store.getters.getAllLinks.reverse();
          },
          totoalSubscribed(){
            return this.$store.getters.totoalSubscribed;
          },
          isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
         
          
         
        },
        methods: {
          rewardIt(link){
           let data= {
              clcikedURL:link,
              timeStamp:+ new Date()
            }

            console.log(data);

            this.$store.dispatch('rewardEntryAction',data)
            setTimeout(() => {
              this.$router.push('/')
            }, 2000);
          }
        },

        // mounted() {
        //   if(!this.isLoggedIn){
        //     this.$router.push('/')
        //   }
        // },

        filters:{
          shortLink(link){
            link= link.split('')
            link.splice(3,link.length/2,'****');
            console.log(link);
            return link.join('')
          }
        }
    }
</script>

<style  scoped>

td a{
  font-size: .7rem;
}
.table{
    /* padding: 1rem; */
}
th{
    /* margin-left: 20px; */
}
tr th{
    background: rgb(252, 180, 121);
    color: rgb(0, 0, 0);
}
td:first-child{
    background: transparent;
}
td{
    background: linear-gradient(240deg,rgb(255, 255, 255),rgb(255, 254, 251));
 
}
td:last-child{
    background: transparent;
  
}
.heading{
    font-size: 1.2rem;
    color: rgb(250, 60, 60);
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
}
.heading2{
    /* font-size: 1.2rem; */
    color: rgb(250, 60, 60);
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
}

</style>