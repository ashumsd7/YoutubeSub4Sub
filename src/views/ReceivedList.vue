<template>
  <div class="row">
   
    <div @click="switchStatus=!switchStatus"  class="btn btn-warning">{{switchStatus? 'SWICTH TO CLICKED LIST' : 'SWICTH TO REQUEST LIST'}}</div>
    <div v-if="switchStatus" class="">
      <h4 class="heading2 text-center mt-2">Requests List for subscribtions</h4>

      <small class="text-center"
        >Subscribe these channels and help and win points.
        <strong class="d-block"
          >Total Points: {{ allSubscribedLinks.length }}/40*</strong
        >
      </small>
      <small class="text-center"> 1 point = ₹1</small>
      <small class="text-center text-danger"
        >After 40 points you will require a premium subscribtion of
        sub4sub.</small
      >
      <hr />
      <!-- <small class="ms-auto text-center">
        Showing {{ getAllLinks.length }} Requests</small
      > -->

      <table class="table">
        <thead>
          <tr>
            <th class="text-center" scope="col">s.no.</th>
            <th scope="col">links received</th>
            <th class="text-center" scope="col">requested at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in getRequestedLinks" :key="item.idx">
            <td class="text-center" scope="row">
              <span class="badge bg-dark">{{ ++idx }} </span>
            </td>
            <td @click="rewardIt(item.url)">
              <a class="links" target="_blank" :href="item.url">
                {{ item.url | shortLink }}</a
              >
            </td>
            <td class="text-center">
              <small>{{ item.requestedAt }}</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="">
      <h4 class="heading2 text-center mt-2">Cliked List for subscribtions</h4>

      <small class="text-center"
        >You have already subscribed these channels and won points.
        <strong class="d-block"
          >Total Points: {{ allSubscribedLinks.length }}/40*</strong
        >
      </small>
      <small class="text-center"> 1 point = ₹1</small>
      <small class="text-center text-danger"
        >After 40 points you will require a premium subscribtion of
        sub4sub.</small
      >
      <hr />
      <!-- <small class="ms-auto text-center">
        Showing {{ getAllLinks.length }} Requests</small
      > -->

      <table class="table">
        <thead>
          <tr>
            <th class="text-center" scope="col">s.no.</th>
            <th scope="col">links subscribed</th>
            <!-- <th class="text-center" scope="col">requested at</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in allSubscribedLinks" :key="item.idx">
            <td class="text-center" scope="row">
              <span class="badge bg-dark">{{ ++idx }} </span>
            </td>
            <td >
              <a class="links" target="_blank" :href="item.url">
                {{ item.url  }}</a
              >
            </td>
            <!-- <td class="text-center">
              <small>{{ item.clickedAt }}</small>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getRequestedLinks() {
      return this.$store.getters.getAllLinks;
    },
    allSubscribedLinks() {
      return this.$store.getters.allSubscribedLinks.reverse();
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    rewardIt(link) {
      let data = {
        url: link,
        timeStamp: +new Date(),
      };

      this.$store.dispatch("rewardEntryAction", data);
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
  },

  data() {
    return {
      switchStatus:true,
    }
  },

  filters: {
    shortLink(link) {
      link = link.split("");
      link.splice(3, link.length / 2, "****");
 
      return link.join("");
    },
  },
};
</script>

<style  scoped>
td a {
  font-size: 0.7rem;
}

tr th {
  background: rgb(252, 180, 121);
  color: rgb(0, 0, 0);
}
td:first-child {
  background: transparent;
}
td {
  background: linear-gradient(240deg, rgb(255, 255, 255), rgb(255, 254, 251));
}
td:last-child {
  background: transparent;
}
.heading {
  font-size: 1.2rem;
  color: rgb(250, 60, 60);
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}
.heading2 {
  /* font-size: 1.2rem; */
  color: rgb(250, 60, 60);
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}
</style>