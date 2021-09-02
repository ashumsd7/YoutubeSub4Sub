import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUserPasscode: undefined,
    isLoggedIn: false,
    allUsers: [],
    allLink: [],
    loginError: false,

    requestedURLs: [],
    clickedURLs: [],
    isPro: false,
    maxPoint: 40,
    uniqueKey: "",

    totalSubscribtion: 0,
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.currentUserPasscode = payload.passcode;
    },
    UPDATE_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    UPDATE_YOUTUBE_LINKS(state, links) {
      state.requestedURLs = links;
    },

    UPDATE_TOTAL_SUBSCRIBTION(state, links) {
      state.clickedURLs = links;
    },
    UPDATE_MAX_POINTS(state, points) {
      state.maxPoint = points;
    },
    UPDATE_PRO_STATUS(state, status) {
      state.isPro = status;
    },
    UPDATE_LOGIN_ERROR_STATUS(state, status) {
      state.loginError = status;
    },
    UPDATE_UNIQUE_KEY(state, key) {
      state.uniqueKey = key;
    },
    UPDATE_CLICKED_URL(state, data) {
      state.clickedURLs.push(data);
      console.log(state.clickedURLs);
    },
  },
  actions: {
    updateUserAction() {},

    autoLoginAction(context) {
      let storedUser = localStorage.getItem("passcode");
      if (!!storedUser) {
        context.dispatch("loginAction", { passcode: storedUser });
      }
    },

    logOutAction(context) {
      localStorage.removeItem("passcode");
      // window.location.reload();
      context.commit("UPDATE_LOGIN_STATUS", false);
      context.commit("UPDATE_TOTAL_SUBSCRIBTION", 0);
      context.commit("UPDATE_YOUTUBE_LINKS", []);
    },

    loginAction(context, payload) {
      payload.passcode = payload.passcode.toString();
      context.commit("UPDATE_USER", payload);
      axios
        .get(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${context.state.currentUserPasscode}.json`
        )
        .then((res) => {
          if (res.data !== null) {
            // console.log(res.data);
            context.commit("UPDATE_LOGIN_STATUS", true);
            context.commit("UPDATE_LOGIN_ERROR_STATUS", false);
            localStorage.setItem("passcode", context.state.currentUserPasscode);
            context.dispatch("fetchUsersPasscode", {
              passcode: context.state.currentUserPasscode,
            });
          } else {
            // console.log("errrrrrr nulll");
            context.commit("UPDATE_LOGIN_ERROR_STATUS", true);
          }
          // console.log(res);
        })
        .catch((err) => {
          context.commit("UPDATE_LOGIN_ERROR_STATUS", true);
          console.log(err);
        });
    },

    adminLoginAction(context, payload) {
      payload.passcode = payload.passcode.toString();
      context.commit("UPDATE_USER", payload);
      let data;

      data = {
        requestedURLs: [],
        maxPoint: 40,
        isPro: false,
        clickedURLs: [],
      };

      let user = context.state.currentUserPasscode.toString();

      axios
        .post(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${user}.json`,
          data
        )
        .then((res) => {
          if (!res.data) {
            context.dispatch("UPDATE_LOGIN_STATUS", true);
          }
          // console.log(res);
        })
        .catch((err) => {
          console.log("errtr", err);
        });
    },

    makeEntryAction(context, payload) {
      payload.passcode = payload.passcode.toString();

      let data;

      data = { url: payload.link, date: new Date().toLocaleString() };

      let user = payload.passcode.toString();

      axios
        .post(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${user}.json`,
          data
        )
        .then((res) => {
          if (!res.data) {
            context.dispatch("UPDATE_LOGIN_STATUS", true);
          }
          // console.log(res);
        })
        .catch((err) => {
          console.log("errtr", err);
        });
    },

    rewardEntryAction(context, payload) {
      // console.log("this is ",payload);
      context.commit("UPDATE_CLICKED_URL", {
        url: payload.url,
        clickedAt: payload.timeStamp,
      });

      let data = {
        requestedURLs: context.state.requestedURLs,
        maxPoint: context.getters.getMaxPoints,
        isPro: context.getters.getProStatus,
        clickedURLs: context.state.clickedURLs,

      };
      let currentUser= context.getters.getCurrentUser;
      let uniqueKey= context.getters.getUniqueKey;
      axios
        .put(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${currentUser}/${uniqueKey}.json`,
          data
        )
        .then((response) => {
          // console.log("sucesssss");
          alert("You are Rewarded :)")
          // console.log(response);
        })
        .catch((error) => {
          alert("Something Went Wrong :(")
          // console.log(error);
        });
    },
    fetchUsersPasscode(context, payload) {
      axios
        .get(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${payload.passcode}.json`
        )
        .then((res) => {
          let fetchedLinks = res.data;
          // console.log(Object.keys(fetchedLinks)[0]);
          //val is unique key
          let val = Object.keys(fetchedLinks)[0];

          // console.log("unique Key",val);
          let unique_key = val;
          // console.log("all reqURLS", fetchedLinks[val].requestedURLs);
          let requestedURLs = fetchedLinks[val].requestedURLs;
          // console.log("all cliked", fetchedLinks[val].clickedURLs);
          let clickedURLs = fetchedLinks[val].clickedURLs;
          // console.log("is Pro", fetchedLinks[val].isPro);
          let isPro = fetchedLinks[val].isPro;
          // console.log("max points", fetchedLinks[val].maxPoint);
          let maxPoint = fetchedLinks[val].maxPoint;

          context.commit("UPDATE_TOTAL_SUBSCRIBTION", clickedURLs);
          context.commit("UPDATE_YOUTUBE_LINKS", requestedURLs);
          context.commit("UPDATE_MAX_POINTS", maxPoint);
          context.commit("UPDATE_PRO_STATUS", isPro);
          context.commit("UPDATE_UNIQUE_KEY", unique_key);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getCurrentUser(state) {
      return state.currentUserPasscode;
    },
    getAllLinks(state) {
      return state.requestedURLs;
    },
    isLoginError(state) {
      return state.loginError;
    },
    allSubscribedLinks(state) {
      return state.clickedURLs;
    },
    getProStatus(state) {
      return state.isPro;
    },
    getMaxPoints(state) {
      return state.maxPoint;
    },
    getUniqueKey(state) {
      return state.uniqueKey;
    },
  },
});
