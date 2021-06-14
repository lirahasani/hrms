// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';

  

const state = {
  hrms_users: [],
  hrms_user: []
};


const mutations = {
  SET_HRMS_USERS(state, data) {
    state.hrms_users = data
  },
  SET_HRMS_USER(state, data) {
    state.hrms_user = data
  },
  RESET(state) {
    state.hrms_users = [],
    state.hrms_user = []
  }
};


const actions = {



  GET_HRMS_USERS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'users'

  
    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
         //console.log(response);
          commit('SET_HRMS_USERS', response.data); 
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
          commit('SET_HRMS_USERS', response.data); 
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
          commit('SET_HRMS_USERS', response.data); 
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


  //create user using api
  CREATE_USER({}, user_details) {
   
    let current_api = API_CONFIG.API_ENDPOINT + 'users'
    let data = { 
        ...user_details
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

  EDIT_USER({}, user_details) {
    let data = { 
      ...user_details
  }
  
    let current_api = API_CONFIG.API_ENDPOINT + 'users/'+ data.id
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

  DELETE_USER({}, user_id) {
  
    let current_api = API_CONFIG.API_ENDPOINT + 'users/'+ user_id
    console.log(user_id)
   

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

  //filters below

  GET_USER_RESULTS({commit}, search_string) {
    if(search_string === ""){
      return
    }
    let current_api = API_CONFIG.API_ENDPOINT + 'users'+ search_string
    console.log(search_string)

    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          commit('SET_HRMS_USERS', response.data)
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


};

const getters = {
  get_hrms_users(state) {
    return state.hrms_users
  },
  get_hrms_user(state){
    return state.hrms_user
  },


};

export default {
  state,
  mutations,
  actions,
  getters
}
