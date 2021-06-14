import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)

import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  actions: {
    reset_vuex({
      commit,
      dispatch
    }) {
      /* Reset user main data */
      dispatch('user/auth/LogOutUser')
      commit("user/auth/RESET")
      return 'done'
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production',
})

export default store
