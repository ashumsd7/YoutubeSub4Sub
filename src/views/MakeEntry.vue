<template>
<div id="login" >
    <div class="row">


    <div class="col-lg-2">

    </div>
     <div class="col-lg-8 mt-5">
 <form @submit.prevent="onSubmit">
       <strong>Admin Login</strong>
       
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
     <div class="col-lg-2">

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
            return;
        }
      this.$store.dispatch("adminLoginAction", { passcode: this.passcode });
    },
  },
};
</script>

<style  scoped>
form {
  margin-top: 20vh;
  margin-left: 10%;
  margin-right: 10%;
}
.invalidId{
    color: red;
}
</style>