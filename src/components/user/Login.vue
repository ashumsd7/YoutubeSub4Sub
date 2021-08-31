<template>
<div id="login" >
    <div class="row">
     
    <div class="col-lg-2">
    

    </div>
      
     <div class="col-lg-8 ">
        
 <form @submit.prevent="onSubmit">
    <strong>User Login</strong>
    <hr>
  <!-- <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">User ID</label>
    <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Enter User ID provided by vendor.</div>
  </div> -->
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Passcode</label>
    <input maxlength="10" v-model.trim="passcode" placeholder="ex: 1234567890" required type="search" class="form-control" id="exampleInputPassword1">
        <div id="passHelp" class="form-text">Enter your unique passcode.</div>
  </div>
 
  <button type="submit" class="btn btn-primary mb-2">Quick -Login</button>

</form>
 <button type="submit" @click="autoLogin" class="btn btn-info auto-login">Try Auto Login</button>
    </div>

     <div class="col-lg-2">

    </div>
   
    </div>
    <div class="row">
       
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                passcode:null
            }
        },
        methods: {
            onSubmit(){
                
                
         
                      this.$store.dispatch('loginAction',{passcode: this.passcode })
                 
              
            },
            autoLogin(){
   this.$store.dispatch('autoLoginAction')
            }
        },
    }
</script>

<style  scoped>
.row{
    margin-top: 22vh;
    margin-left: 10%;
    margin-right: 10%;
    
}
.auto-login{
   width: auto;
}
</style>