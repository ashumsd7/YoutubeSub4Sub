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

    totalSubscribtion:0
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.currentUserPasscode = payload.passcode;
    },
    UPDATE_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    UPDATE_YOUTUBE_LINKS(state, links) {
      state.allLink = links;
    },
    UPDATE_LOGIN_ERROR_STATUS(state, status) {
      state.loginError = status;
    },
    UPDATE_TOTAL_SUBSCRIBTION(state,count){
      state.totalSubscribtion=count
    }
  },
  actions: {
    updateUserAction() {},

    autoLoginAction(context) {
      let storedUser = localStorage.getItem("passcode");
      if (!!storedUser) {
        context.dispatch("loginAction", { passcode: storedUser });
      }
    },
    logOutAction() {
      // window.location.reload();
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
            console.log(res.data);
            context.commit("UPDATE_LOGIN_STATUS", true);
            context.commit("UPDATE_LOGIN_ERROR_STATUS", false);
            localStorage.setItem("passcode", context.state.currentUserPasscode);
            context.dispatch("fetchUsersPasscode", {
              passcode: context.state.currentUserPasscode,
            });
          } else {
            console.log("errrrrrr nulll");
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

      data = { url: "https://google.co.in" };

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
          console.log(res);
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
          console.log(res);
        })
        .catch((err) => {
          console.log("errtr", err);
        });
    },

    rewardEntryAction(context, payload) {
      // payload.passcode = payload.passcode.toString();

      let data;

      // data = { url: payload.link, date: new Date().toLocaleString() };
      data=
        {clcikedURL:payload.clcikedURL,
        clickedAt:payload.timeStamp}
      let user = context.state.currentUserPasscode.toString();

      axios
        .post(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${user}.json`,
          data
        )
        .then((res) => {
          if (!res.data) {
            // context.dispatch("UPDATE_LOGIN_STATUS", true);
            alert("something went wrong")
          }
          console.log(res);
        })
        .catch((err) => {
          console.log("errtr", err);
        });
    },
    fetchUsersPasscode(context, payload) {
      axios
        .get(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${payload.passcode}.json`
        )
        .then((res) => {
          let fetchedLinks = res.data;
          console.log(fetchedLinks);
          let fetchedLinkArray = [];
          let clickedURLs=[]
          let i = 0;
          for (let val in fetchedLinks) {
          
            if(fetchedLinks[val].url!==undefined){
              fetchedLinkArray.push({
                links: fetchedLinks[val].url,
                id: ++i,
                date: fetchedLinks[val].date,
              });
            }
            
            if(fetchedLinks[val].clcikedURL!==undefined){
              
              clickedURLs.push({clickedURL:fetchedLinks[val].clcikedURL})
            }
          }
          context.commit('UPDATE_TOTAL_SUBSCRIBTION',clickedURLs.length)

      


          context.commit("UPDATE_YOUTUBE_LINKS", fetchedLinkArray);
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
      return state.allLink;
    },
    isLoginError(state) {
      return state.loginError;
    },
    totoalSubscribed(state){
      return state.totalSubscribtion;
    }
  },
});
