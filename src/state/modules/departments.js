// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';
import router from '@router'
import Vue from 'vue'



const state = {
  department_details: [],
  department_single:[]
};


const mutations = {
  SET_DEPARTMENT_DETAILS(state, data) {
    state.department_details = data
  },
  RESET(state) {
    state.department_details = [],
    state.department_single = []
  },
  SET_DEPARTMENT_SINGLE(state, data) {
    state.department_single = data
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
          commit('SET_DEPARTMENT_DETAILS', response.data); 
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
          commit('SET_DEPARTMENT_DETAILS', response.data); 
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  CREATE_DEPARTMENT({}, departmentDetails) {
   
    let current_api = API_CONFIG.API_ENDPOINT + 'departments'
    let data = { 
        ...departmentDetails
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

  GET_DEPARTMENTS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'departments'


    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
         // console.log(response);
          commit('SET_DEPARTMENT_DETAILS', response.data); 
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

    //get single department from api
    GET_DEPARTMENT_SINGLE({commit}, departmentId) {
      if(departmentId == '' || departmentId == null){
        return
      }
      let current_api = API_CONFIG.API_ENDPOINT + 'departments/'+ departmentId
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            commit('SET_DEPARTMENT_SINGLE', response.data)
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    EDIT_DEPARTMENT({}, details) {
      let data = { 
        ...details
    }
    
      let current_api = API_CONFIG.API_ENDPOINT + 'departments/'+ data.id
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


    DELETE_DEPARTMENT({}, id) {
  
      let current_api = API_CONFIG.API_ENDPOINT + 'departments/'+ id

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
  get_department_details(state) {
    return state.department_details
  },
  get_department_single(state) {
    return state.department_single
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
