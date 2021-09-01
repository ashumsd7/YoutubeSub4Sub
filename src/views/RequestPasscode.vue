<template>
  <div class="d-flex justify-content-center passcode-container">
      <hr>
     
      <hr>
    <div v-if="isLoding" class="spinner-grow text-warning m-auto"  role="status">
      <span class="sr-only">Loading...</span>
      
    </div>
    <iframe
      v-else
      src="https://docs.google.com/forms/d/e/1FAIpQLSfdYh6nhHQnEGS3Ut4gGhF7qvBDJNegg-kkfOciMdLL6gDndA/viewform?embedded=true"
      width="100%"
      height="800"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      >Loading…</iframe
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoding: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoding = false;
    }, 2000);
  },
};
</script>

<style  scoped>
.passcode-container{
    background: rgb(232, 239, 253);
}
</style>