import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUserPasscode: undefined,
    isLoggedIn: false,
    // allUsers: [],
    // allLink: [],
    loginError: false,

    requestedURLs: [],
    clickedURLs: [],
    isPro: false,
    maxPoint: 40,
    uniqueKey: "",

//KIND HEARTED DATA ( WHO SHARED LINK WITH YOU)

    sharedUniqueKey:'',
    sharedPasscode:'',
    sharedRequestedURL:[],
    sharedClickedURL:[],
    isProShared: false,
    maxPointShared: 40,
    
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
    //push in clicled links
    UPDATE_CLICKED_URL(state, data) {
      console.log("pahle ka clicked data");
      console.log(state.clickedURLs);
      state.clickedURLs.push(data);
      console.log("baad ka clicked data");
      console.log(state.clickedURLs);
    },
    //push in req links
   ADD_YOUTUBE_LINKS(state, data) {
      state.requestedURLs.push(data)
    },
    UPDATE_SHARED_DATA(state, payload) {
      state.sharedPasscode= payload.passcode;
      state.sharedUniqueKey= payload.unique_key
    },
  
    UPDATED_SHARED_REST_DATA(state,payload){
      state.sharedRequestedURL= payload.requestedURLs;
      state.sharedClickedURL= payload.clickedURLs;
      state.isProShared= payload.isPro;
      state.maxPointShared= payload.maxPoint;
    },

    UPDATE_SHARED_REQUESTED_URLS(state,payload){
      state.sharedRequestedURL.push(payload)
    }
  },
  actions: {
    updateUserAction() {},

    // autoLoginAction(context) {
    //   let storedUser = localStorage.getItem("passcode");
    //   if (!!storedUser) {
    //     context.dispatch("loginAction", { passcode: storedUser });
    //   }
    // },

    logOutAction(context) {
      localStorage.removeItem("passcode");
      // window.location.reload();
      context.commit("UPDATE_LOGIN_STATUS", false);
      context.commit("UPDATE_TOTAL_SUBSCRIBTION", 0);
      context.commit("UPDATE_YOUTUBE_LINKS", []);
    },

    // loginAction(context, payload) {
      
    //   payload.passcode = payload.passcode.toString();
    //   context.commit("UPDATE_USER", payload);
    //   axios
    //     .get(
    //       `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${context.state.currentUserPasscode}.json`
    //     )
    //     .then((res) => {
    //       if (res.data !== null) {
    //         // console.log(res.data);
    //         context.commit("UPDATE_LOGIN_STATUS", true);
    //         context.commit("UPDATE_LOGIN_ERROR_STATUS", false);
    //         localStorage.setItem("passcode", context.state.currentUserPasscode);
    //         context.dispatch("fetchUsersPasscode", {
    //           passcode: context.state.currentUserPasscode,
    //         });
    //       } else {
    //         // console.log("errrrrrr nulll");
    //         context.commit("UPDATE_LOGIN_ERROR_STATUS", true);
    //       }
    //       // console.log(res);
    //     })
    //     .catch((err) => {
    //       context.commit("UPDATE_LOGIN_ERROR_STATUS", true);
    //       console.log(err);
    //     });
    // },

    adminLoginAction(context, payload) {
      payload.passcode = payload.passcode.toString();
      context.commit("UPDATE_USER", payload);
      let data;

      data = {
        requestedURLs: [{url:'111',clickedAt:'222'} ],
        maxPoint: 40,
        isPro: false,
        clickedURLs: [{url:'333',requestedAt:'444'}],
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
          
        })
        .catch((err) => {
          console.log("errtr", err);
        });
    },


// WHEN USER IS GOING TO SHARE THEIR YOUTUBE URL 
// ---------START--------------

    prepareEntryAction(context,payload){
    
      let user = payload.passcode.toString();
      // console.log("kind hearted is ", user);
      axios
      .get(
        `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${user}.json`,
        
      )
      .then((res) => {
        let unique_key = Object.keys(res.data)[0];
        // console.log("shared user is", user);
        context.commit('UPDATE_SHARED_DATA',{ passcode: user, unique_key:unique_key})
        context.dispatch('getKindHeartedData',{passcode:user})
      })
      .catch((err) => {
        console.log("errtr", err);
      });
    },

    getKindHeartedData(context, payload){
      // console.log("getting kind heated data");
      axios
      .get(
        `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${payload.passcode}.json`
      )
      .then((res) => {
        let fetchedLinks = res.data;
        let val = Object.keys(fetchedLinks)[0];
        // console.log("unique Key",val);
        let unique_key = val;
        let requestedURLs = fetchedLinks[val].requestedURLs;
        let clickedURLs = fetchedLinks[val].clickedURLs;
        let isPro = fetchedLinks[val].isPro;
        let maxPoint = fetchedLinks[val].maxPoint;
      context.commit('UPDATED_SHARED_REST_DATA',{ requestedURLs: requestedURLs, clickedURLs:clickedURLs,isPro:isPro, maxPoint:maxPoint })
      })
      .catch((err) => {
        console.log(err);
      });
    },

    makeEntryAction(context, payload) {
      payload.passcode = payload.passcode.toString();
      let user = payload.passcode.toString();
      context.commit("UPDATE_SHARED_REQUESTED_URLS", {
        url: payload.link,
        requestedAt: payload.date,
      });

      let data = {
        requestedURLs: context.state.sharedRequestedURL,
        maxPoint: context.getters.maxPointShared,
        isPro: context.getters.isProShared,
        clickedURLs: context.state.sharedClickedURL,

      };
      let sharedUser= context.state.sharedPasscode;
      let uniqueKey= context.state.sharedUniqueKey;
      axios
        .put(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${sharedUser}/${uniqueKey}.json`,
          data
        )
        .then((response) => {
          alert("You have successfully requested :)")
         
        })
        .catch((error) => {
          alert("Something Went Wrong :( while requesting")
        });
    },

// WHEN USER IS GOING TO SHARE THEIR YOUTUBE URL 
    // ---------END   --------------

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
      console.log("About to commit reward");
      console.log(data);
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
    loginAction(context, payload) {
      payload.passcode = payload.passcode.toString();
      context.commit("UPDATE_USER", payload);



      axios
        .get(
          `https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${payload.passcode}.json`
        )
        .then((res) => {
          if (res.data !== null) {
            context.commit("UPDATE_LOGIN_STATUS", true);
            context.commit("UPDATE_LOGIN_ERROR_STATUS", false);
          let fetchedLinks = res.data;
          console.log("fethced links ",res );
          console.log(fetchedLinks);
          let val = Object.keys(fetchedLinks)[0];
          let unique_key = val;
          let requestedURLs = fetchedLinks[val].requestedURLs;
          let clickedURLs = fetchedLinks[val].clickedURLs;
          let isPro = fetchedLinks[val].isPro;
          let maxPoint = fetchedLinks[val].maxPoint;

          context.commit("UPDATE_TOTAL_SUBSCRIBTION", clickedURLs);
          context.commit("UPDATE_YOUTUBE_LINKS", requestedURLs);
          context.commit("UPDATE_MAX_POINTS", maxPoint);
          context.commit("UPDATE_PRO_STATUS", isPro);
          context.commit("UPDATE_UNIQUE_KEY", unique_key);
          }
          else{
            context.commit("UPDATE_LOGIN_ERROR_STATUS", true);
          }

        })
        .catch((err) => {
          context.commit("UPDATE_LOGIN_ERROR_STATUS", true);
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
      // alert("Adhu")
      let updatedLinks=[]
      // console.log("requested urls length",state.requestedURLs.length );
      if(state.requestedURLs.length>1){
        // console.log("len is more than 1", state.requestedURLs);
        state.requestedURLs.splice(0,1)
        // console.log("forked", state.requestedURLs);
        updatedLinks= state.requestedURLs
        return updatedLinks;
      }
  
      return state.requestedURLs;
     
    },
    isLoginError(state) {
      return state.loginError;
    },
    allSubscribedLinks(state) {

      let updatedLinks=[]
      if(state.clickedURLs.length>1){
        state.clickedURLs.splice(0,1)
        updatedLinks= state.clickedURLs
        return updatedLinks;
      }
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
