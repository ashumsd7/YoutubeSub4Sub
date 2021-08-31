<template>
  <div id="login">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8 mt-5">
        <form @submit.prevent="onSubmit">
          <strong>Request for your subscription !!</strong>

          <hr />

          <p v-if="isURLError" class="invalidId">
            It seems <strong> '{{ requestedID }}'</strong> is not an admin.
          </p>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Request to</label
            >
            <input
              maxlength="8"
              v-model.trim="requestedID"
              readonly
              required
              type="search"
              placeholder="ex: admin001"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">Enter Admin ID</div>
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
          </div>

          <button type="submit" class="btn btn-primary">Request</button>
        </form>
      </div>
      <div class="col-lg-2"></div>
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
    };
  },
  created() {
    this.requestedID = this.$route.params.id;
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("makeEntryAction", {
        passcode: this.requestedID,
        link: this.link,
      });
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
.invalidId {
  color: red;
}
</style>