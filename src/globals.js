import Vue from 'vue'
import store from '@state/store'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../images/error.png',
  loading: '../images/loading.gif',
  attempt: 1
})


Vue.component('mstrNotification',
  () => import('@misc/MstrErrorBottomNotifications.vue')
)

Vue.component('pagination', require('laravel-vue-pagination'));

// import vuexI18n from 'vuex-i18n';
// import translationsEn from '@src/languages/en.json'
// import translationsFr from '@src/languages/fr.json'
// // add translations directly to the application
// Vue.use(vuexI18n.plugin, store);
// Vue.i18n.add('en', translationsEn);
// Vue.i18n.add('fr', translationsFr);
// // set the start locale to use
// Vue.i18n.set('en');

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('7d');

import VueMoment from 'vue-moment'
Vue.use(VueMoment);

import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;
Vue.prototype.$Validator = Validator
Vue.use(SimpleVueValidation);


import '@styles'
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.config.errorHandler = function (err, vm, info) {
  console.log('[Global Error Handler]: Error in ' + info + ': ' + err);
}
