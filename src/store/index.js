import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUserPasscode: '',
    isLoggedIn:false,
    allUsers: [],
    allLink: [],
    
    
  },
  mutations: {
    UPDATE_USER(state,payload) {
      state.currentUserPasscode= payload.passcode
    },
    UPDATE_LOGIN_STATUS(state,status) {
      state.isLoggedIn= status
    }
  },
  actions: {
    updateUserAction() {
      
    },

    autoLoginAction(context) {
     let storedUser = localStorage.getItem('passcode')
      if (!!storedUser) {
       context.dispatch('loginAction',{passcode:storedUser})
      }
      
    },
    logOutAction() {
      window.location.reload();
    },
    loginAction(context, payload) {
        payload.passcode = payload.passcode.toString();
      context.commit('UPDATE_USER', payload)
      axios.get(`https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${context.state.currentUserPasscode}.json`)
        .then(res => {
          if (res.data !== null) {
            context.commit('UPDATE_LOGIN_STATUS', true);
            localStorage.setItem('passcode',context.state.currentUserPasscode )
          }
        console.log(res);
        }).catch(err => {
        console.log(err);
      })
    },

    adminLoginAction(context, payload) {
      payload.passcode = payload.passcode.toString();
      context.commit('UPDATE_USER', payload);
      let data = {url:'https://google.co.in'}
      let user = context.state.currentUserPasscode.toString();
    
      axios.post(`https://sub4sub-cb7f9-default-rtdb.firebaseio.com/${user}.json`,data)
        .then(res => {
         if (!res.data) {
            context.dispatch('UPDATE_LOGIN_STATUS', true)
          }
        console.log(res);
        }).catch(err => {
        console.log("errtr",err);
      })
    },
    fetchUsersPasscode() {
      
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getCurrentUser(state) {
      return state.currentUserPasscode;
    }
    
 }
})
