// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import Toasted from 'vue-toasted';
import 'buefy/lib/buefy.css';
import App from './App';
import router from './router';

Vue.use(Buefy);
Vue.use(Toasted);

// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = process.env.BASEURL_DEV;
//  } else axios.defaults.baseURL = process.env.BASEURL_PROD;

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
