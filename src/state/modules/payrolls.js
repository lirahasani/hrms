// Important imports that always should be present
import {
    API_CONFIG
  } from '@utils/server.js';
  
  
  const state = {
    bonuses: [],
    payrolls: []
  };
  
  
  const mutations = {
    SET_BONUSES(state, data) {
      state.bonuses = data
    },
    SET_PAYROLLS(state, data) {
      state.payrolls = data
    },

    RESET(state) {
      state.bonuses = [],
      state.payrolls = []
    }
  };
  
  
  const actions = {


    GET_NEXT_PAGE({commit}, page_url) {
      let current_api = page_url
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
          // console.log(response.data);
            commit('SET_PAYROLLS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
    GET_PREVIOUS_PAGE({commit}, page_url) {
      let current_api = page_url
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
          // console.log(response.data);
            commit('SET_PAYROLLS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },


  
    ADD_BONUS({}, bonus_details) {
   
      let current_api = API_CONFIG.API_ENDPOINT + 'payrolls'
      let data = { 
        ...bonus_details
    }
      console.log(bonus_details)

      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .post(current_api, data , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
            console.log(response);
             resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    GET_PAYROLLS({commit}) {
      let current_api = API_CONFIG.API_ENDPOINT + 'payrolls'
  
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            console.log(response);
            commit('SET_PAYROLLS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    GET_PAYROLL_RESULTS({commit}, search_string) {
      if(search_string === ""){
        return
      }
      let current_api = API_CONFIG.API_ENDPOINT + 'payrolls'+ search_string
      console.log(search_string)
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            commit('SET_PAYROLLS', response.data)
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },


  };
  
  const getters = {
    get_recruitments(state) {
      return state.recruitments
    },
    get_recruitment(state){
      return state.recruitment
    },
    get_payrolls(state){
      return state.payrolls
    }

  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  