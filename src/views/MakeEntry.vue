<template>
  <div id="login">
    <div class="row">
      <div class="col-lg-5">
        <img
          src="../assets/people.png"
          alt=""
          class="img-fluid  mt-5"
          width="300"
          height="300"
          srcset=""
        />
      </div>
      <div class="col-lg-5 mt-6">
        <form @submit.prevent="onSubmit">
          <strong class="heading">Request for your subscription !!</strong>

          <hr />

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Request to</label
            >
            <input
              maxlength="8"
              v-model.trim="requestedID"
               required
              :readonly='isReadonly'
              @dblclick="makeEditable"
              type="search"
              placeholder="ex: admin001"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">Double click to change it.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Your Channel Link</label
            >
            <input
              v-model.trim="link"
              required
              type="search"
              placeholder="ex: youtu.be/biB5-coY"
              class="form-control"
              id="exampleInputPassword1"
            />
            <div id="passHelp" class="form-text">Enter your channel link</div>
            <small v-if="isURLError" class="invalidId">
              Sorry, Link you have entered is not a youtube link.
            </small>

            
      
          
          </div>

          <button type="submit" class="btn btn-danger">Request</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: null,
      requestedID: null,
      isURLError: false,
      isReadonly:true
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  created() {
    this.requestedID = this.$route.params.id;
  },
  //   beforeRouteEnter (to, from, next) {
  //       if(!this.isLoggedIn){
  //           this.$router.push('/')
  //       }
  //   },
  methods: {
    onSubmit() {
      if (this.vlaidateLink(this.link)) {
        this.$store.dispatch("makeEntryAction", {
          passcode: this.requestedID,
          link: this.link,
        });
      } else {
        this.isURLError = true;
        setTimeout(() => {
          this.isURLError = false;
          this.link = "";
        }, 2000);
      }
    },

    vlaidateLink(url) {
      var p =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      return url.match(p) ? RegExp.$1 : false;
    },
    makeEditable(){
        this.isReadonly=false
    }
  },
};
</script>

<style  scoped>
.row {
  margin-top: 20vh;
  margin-left: 10%;
  margin-right: 10%;
}
form {
  margin-left: 10%;
  margin-right: 10%;
}
.heading {
  font-size: 1.2rem;
  color: rgb(250, 60, 60);
}
label {
  font-weight: 500;
  color: darkblue;
}
.invalidId {
  color: red;
}
</style>