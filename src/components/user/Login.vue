<template>
  <div id="login">
    <div class="row">
      <div class="col-lg-6">
        <img
          src="../../assets/chat.png"
          class="img-fluid p-3 feature-img"
          width="300"
          height="300"
          alt=""
        />
      </div>

      <div class="col-lg-5">
        <form @submit.prevent="onSubmit">
          <strong class="heading">User Login </strong>
          <hr />
          <div v-if="isError" id="invalidText" class="form-text">
            {{ passcode }} is not a valid passcode.
          </div>
          <!-- <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">User ID</label>
    <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Enter User ID provided by vendor.</div>
  </div> -->
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Passcode</label
            >
            <input
              maxlength="10"
              v-model.trim.lazy.number="passcode"
              placeholder="ex: 1234567890"
              required 
             
              type="number"
              class="form-control"
              id="exampleInputPassword1"
            />
            <div id="passHelp" class="form-text">
              Enter your unique passcode.
            </div>
          </div>

          <button type="submit" class="btn btn-primary mb-2 login_btn">Login</button>
        </form>
        <!-- <a
          type="submit"
          @click="autoLogin"
          class=" auto-login"
        >
         Try auto login {{isLoginError}}
        </a> -->
        <p class="request_text mr-2"> <router-link to="/passcode">Request for a Passcode ?</router-link> </p>
      </div>

      <div class="col-lg-2"></div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isLoginError() {
      return this.$store.getters.isLoginError;
    },
  },
  data() {
    return {
      passcode: null,
      isError:this.isLoginError
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("loginAction", { passcode: this.passcode });
     setTimeout(() => {
          if (!this.isLoginError) {
        this.$router.push("/list");
      }
     }, 2000);
    },
    clearInput(){
      alert("focused")
      this.isError= false;

    }
    // autoLogin() {
    //   let passcode = localStorage.getItem("passcode");
    //   if(!passcode){
    //       alert("Auto login failed, Please try mannualy.")

    //       return;
    //   }
    //   let answer = confirm(
    //     `We are trying to login with this ${passcode} passcode?`,
    //     false
    //   );
    //   if (answer) {
    //     this.$store.dispatch("autoLoginAction");

    //     this.$router.push("/list");
    //   } else {
    //     return;
    //   }
    // },
  },
};
</script>

<style  scoped>
.row {
  margin-top: 8vh;
  margin-left: 10%;
  margin-right: 10%;
}
.auto-login {
  width: auto;
}
.heading {
  font-size: 1.5rem;
  color: rgb(250, 60, 60);
}
label {
  font-weight: 500;
  color: darkblue;
}
.request_text {
  margin-top: 10px;
  color: rgb(253, 68, 68);
  cursor: pointer;
  text-decoration: underline;
}
#invalidText{
    color: rgb(252, 103, 103);
    font-weight: bold;
}

</style>