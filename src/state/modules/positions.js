// Important imports that always should be present
import {
    API_CONFIG
  } from '@utils/server.js';
  
  
  const state = {
    positions: [],
    position: []

  
  
  };
  
  
  const mutations = {
    SET_POSITIONS(state, data) {
      state.positions = data
    },
    SET_POSITION(state, data) {
      state.position = data
    },
    RESET(state) {
      state.positions = []
      state.position = []
   
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
            commit('SET_POSITIONS', response.data); 
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
            commit('SET_POSITIONS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
    CREATE_POSITION({}, positionDetails) {
   
      let current_api = API_CONFIG.API_ENDPOINT + 'positions'
      let data = { 
          ...positionDetails
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

    GET_POSITION({commit}, position_id) {
      if(position_id == '' || position_id == null){
        return
      }
      let current_api = API_CONFIG.API_ENDPOINT + 'positions/'+ position_id
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            commit('SET_POSITION', response.data)
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
  
    GET_POSITIONS({commit}) {
      let current_api = API_CONFIG.API_ENDPOINT + 'positions'
  
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            //console.log(response);
            commit('SET_POSITIONS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },


    EDIT_POSITION({}, position_details) {
      let data = { 
        ...position_details
    }
    
      let current_api = API_CONFIG.API_ENDPOINT + 'positions/'+ data.id
    //console.log(current_api)
     
  
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


  
    DELETE_POSITION({}, id) {
  
      let current_api = API_CONFIG.API_ENDPOINT + 'positions/'+ id

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
    get_positions(state) {
      return state.positions
    },
    get_position(state){
      return state.position
    }

  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  