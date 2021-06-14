// Important imports that always should be present
import {
    API_CONFIG
  } from '@utils/server.js';
  import router from '@router'
  import Vue from 'vue'
  
  
  
  const state = {
    roles: [],
  };
  
  
  const mutations = {
    SET_ROLES(state, data) {
      state.roles = data
    },
    RESET(state) {
      state.roles = []
    }
  };
  
  
  const actions = {
  
  
  
    GET_ROLES({commit}) {
      let current_api = API_CONFIG.API_ENDPOINT + 'roles'
  
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
           // console.log(response);
            commit('SET_ROLES', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
  
  };
  
  const getters = {
    get_roles(state) {
      return state.roles
    },
  
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  