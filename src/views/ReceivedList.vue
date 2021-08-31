<template>
   <div class="row">
     
       <table class="table ">
  <thead>
    <tr>
      <th scope="col">#S.No.</th>
      <th  scope="col">Links</th>
      <th class="text-center" scope="col">Date</th>
   
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in getAllLinks" :key="item.id">
      <th class="ml-2" scope="row">{{item.id}}</th>
      <td><a :href="item.link"> {{ item.links}}</a></td>
      <td class="text-center">Otto</td>
    
    </tr>
   
  </tbody>
</table>
{{getAllLinks}}
   </div>
</template>

<script>
    export default {
        computed:{
          getAllLinks(){
            return this.$store.getters.getAllLinks;
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
</style>