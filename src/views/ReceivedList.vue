<template>
   <div class="row">
     
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
      <td class="text-center" scope="row">{{item.id}}</td>
      <td><a :href="item.links"> {{ item.links}} </a></td>
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
    background: rgb(121, 123, 252);
    color: rgb(234, 241, 250);
}
</style>