<template>
<div id="login" >
    <div class="row">

        
    <div class="col-lg-6">
        <img src="../assets/admin.png" alt="" class="img-fluid p-3 mt-5" width="300" height="300" srcset="">
    </div>
     <div class="col-lg-5 mt-3">
 <form @submit.prevent="onSubmit">
       <strong class="heading">Admin Login</strong>
       
    <hr>
  
    <p v-if="isAdminErr" class="invalidId">It seems  <strong> '{{ adminId}}'</strong>  is not an admin.</p>
   <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Admin ID</label>
    <input maxlength="8" v-model.trim="adminId" required type="search" placeholder="ex: admin001" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Enter Admin ID</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">New Passcode</label>
    <input  maxlength="10" v-model.trim="passcode" required type="search" placeholder="ex: 1234567890" class="form-control" id="exampleInputPassword1">
        <div id="passHelp" class="form-text">Create a unique passcode.</div>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
     
   
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      passcode: null,
      adminId:null,
      isAdminErr:false
    };
  },
  methods: {
    onSubmit() {
        if(this.adminId!=='boomboom'){
            this.isAdminErr=true;
            setTimeout(() => {
                 this.isAdminErr=false;
                 this.adminId=''
            }, 1000);
            return;
        }
      this.$store.dispatch("adminLoginAction", { passcode: this.passcode });
    },
  },
};
</script>

<style  scoped>
.row{
    margin-top: 10vh;
    margin-left: 10%;
    margin-right: 10%;
    
}
form {
  margin-left: 10%;
  margin-right: 10%;
}
.invalidId{
    color: red;
}
.heading{
    font-size: 1.5rem;
    color: rgb(250, 60, 60);
}
label{
    font-weight: 500;
    color: darkblue;
}
</style>