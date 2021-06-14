// Important imports that always should be present
import {
    API_CONFIG
  } from '@utils/server.js';
  
  
  const state = {
    recruitments: [],
    recruitment: [],
    recruitment_status: []

  
  
  };
  
  
  const mutations = {
    SET_RECRUITMENTS(state, data) {
      state.recruitments = data
    },
    SET_RECRUITMENT(state, data) {
      state.recruitment = data
    },
    SET_RECRUITMENT_STATUS(state, data) {
      state.recruitment_status = data
    },
    RESET(state) {
      state.recruitments = []
      state.recruitment = []
      state.recruitment_status = []
   
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
            commit('SET_RECRUITMENTS', response.data); 
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
            commit('SET_RECRUITMENTS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
    CREATE_RECRUITMENT({}, recruitmentDetails) {
   
      let current_api = API_CONFIG.API_ENDPOINT + 'recruitments'
      let data = { 
          ...recruitmentDetails
      }
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .post(current_api, data , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
             resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    GET_RECRUITMENT({commit}, recruitment_id) {
      if(recruitment_id == '' || recruitment_id == null){
        return
      }
      let current_api = API_CONFIG.API_ENDPOINT + 'recruitments/'+ recruitment_id
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            commit('SET_RECRUITMENT', response.data)
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
    GET_STATUS_LIST({commit}) {
      let current_api = API_CONFIG.API_ENDPOINT + 'recruitmentstatus'
  
    
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
           //console.log(response);
            commit('SET_RECRUITMENT_STATUS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
    GET_RECRUITMENTS({commit}) {
      let current_api = API_CONFIG.API_ENDPOINT + 'recruitments'
  
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
           // console.log(response);
            commit('SET_RECRUITMENTS', response.data); 
            
          })
          .catch(error => {
            reject(error);
          });
      });
    },


    EDIT_RECRUITMENT({}, recruitment_details) {
      let data = { 
        ...recruitment_details
    }
    
      let current_api = API_CONFIG.API_ENDPOINT + 'recruitments/'+ data.id
    
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .patch(current_api, data , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
             resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },


  
    DELETE_RECRUITMENT({}, id) {
  
      let current_api = API_CONFIG.API_ENDPOINT + 'recruitments/'+ id

      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .delete(current_api , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
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
    get_recruitment_status(state){
      return state.recruitment_status
    }

  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  