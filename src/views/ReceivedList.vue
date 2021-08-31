<template>
   <div class="row">
     <strong class="heading">>List of Received Requests for subscribtions :  {{getAllLinks.length}}/40</strong>
     
       <table class="table ">
  <thead>
    <tr>
      <th class="text-center" scope="col">#S.No.</th>
      <th  scope="col">Links</th>
      <th class="text-center" scope="col">Date</th>
   
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in getAllLinks" :key="item.id">
      <td class="text-center" scope="row"><span class="badge bg-dark">{{item.id}} </span></td>
      <td><a :href="item.links">  <span class="badge bg-info text-dark">{{ item.links}}</span> </a></td>
      <td class="text-center">Otto</td>
    
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
         
          
         
        },
    }
</script>

<style  scoped>

.row{
    margin-top: 20vh;
}
.table{
    padding: 1rem;
}
th{
    margin-left: 20px;
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
}
</style>