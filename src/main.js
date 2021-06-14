import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/src/state/store'
import './globals.js'



const app = new Vue({
  router,
  store,
  created() {},
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
