// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';
import router from '@router'
import Vue from 'vue'



const state = {
  user_logged_in: false,
  user_details: [],
  user_role_details : {}
};


const mutations = {
  SET_USER_AS_LOGGEDIN(state) {
    state.user_logged_in = true
  },
  SET_USER_DETAILS(state, data) {
    state.user_details = data
  },
  SET_USER_ROLE(state, data) {
    state.user_role_details = data
  },
  RESET(state) {
    state.user_logged_in = false
    state.user_details = [],
    state.user_role_details = {}
  }
};


const actions = {



  LOGIN_USER({commit}, user_details) {
    let current_api = API_CONFIG.API_ENDPOINT + 'auth/login'

    let login_details = {
      ...user_details
    }

    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .post(current_api, login_details, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          commit('SET_USER_AS_LOGGEDIN') // Set user is loggedin
         
          Vue.$cookies.set("token", response.data.access_token);
          router.push({
            name: 'AdminPageDashboard'
          })
         resolve(true);
        })
        .catch(error => {
          reject(error);
          alert("Wrong password or email")
        });
    });
  },


  // REFRESH_TOKEN: () => {
  //   const refreshToken = Vue.$cookies.get("refresh_token");
  //   return new Promise(function (resolve, reject) {
  //     API_CONFIG.SITE_AXIOS.post(process.env.VUE_APP_BASE_URL + 'authenticate/refresh-token', {
  //         "token": refreshToken,
  //         "account_id": account_id
  //       })
  //       .then(response => {
  //         Vue.$cookies.set("token", response.data.token, null, null, null, true, "Lax");


  //         resolve(response);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       })
  //   });
  // },

  GET_USER_PROFILE({ commit }) {
    let current_api = API_CONFIG.API_ENDPOINT + 'user'
    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {} , {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          commit('SET_USER_DETAILS', response.data) // Set user is loggedin

          commit('SET_USER_ROLE', response.data.role)
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },



  LogOutUser({
    commit
  }) {
    Vue.$cookies.remove("token");
    commit('RESET')
    localStorage.clear();
    router.push({
      name: 'Login'
    })
  }







};

const getters = {
  isLoggedin(state) {
    return state.user_logged_in
  },
  get_user_details(state) {
    return state.user_details
  },
  get_user_role(state){
    return state.user_role_details
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
