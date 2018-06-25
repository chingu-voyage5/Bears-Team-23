// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import Toasted from 'vue-toasted';
import 'buefy/lib/buefy.css';
import App from './App';
import router from './router';
import store from './store/store.js';
import Auth from './mixin/auth';

Vue.use(Buefy);
Vue.use(Toasted);
Vue.mixin(Auth);

if (localStorage.vuex) {
  const token = JSON.parse(localStorage.getItem('vuex')).auth.tokens[0].token;

  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
}

// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = process.env.BASEURL_DEV;
//  } else axios.defaults.baseURL = process.env.BASEURL_PROD;

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
