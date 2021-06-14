// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';

  

const state = {
  requests: [],

};


const mutations = {
  SET_REQUESTS(state, data) {
    state.requests = data
  },
  RESET(state) {
    state.requests = []
  }
};


const actions = {



  GET_REQUESTS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'requests'

  
    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
         //console.log(response);
          commit('SET_REQUESTS', response.data); 
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

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
          commit('SET_REQUESTS', response.data); 
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
          commit('SET_REQUESTS', response.data); 
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },



  //get single user from api
  GET_HRMS_USER({commit}, user_id) {
    if(user_id == '' || user_id == null){
      return
    }
    let current_api = API_CONFIG.API_ENDPOINT + 'users/'+ user_id

    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          commit('SET_HRMS_USER', response.data)
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },



  CREATE_REQUEST({}, user_details) {
   
    let current_api = API_CONFIG.API_ENDPOINT + 'requests'
    let data = { 
        ...user_details
    }
    console.log(data)
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


  APPROVE_REQUEST({}, req_id) {
  
    let current_api = API_CONFIG.API_ENDPOINT + 'requests/approve/'+ req_id
    //console.log(req_id)
   

    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .patch(current_api , {
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

  DENY_REQUEST({}, req_id) {
  
    let current_api = API_CONFIG.API_ENDPOINT + 'requests/deny/'+ req_id
    //console.log(req_id)
   
    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .patch(current_api , {
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
  get_requests(state) {
    return state.requests
  }

};

export default {
  state,
  mutations,
  actions,
  getters
}
