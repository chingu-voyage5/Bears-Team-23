// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import Moment from 'vue-moment';
import Toasted from 'vue-toasted';
import Datetime from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import 'buefy/lib/buefy.css';
import App from './App';
import router from './router';
import store from './store/store.js';

Vue.use(Datetime);
Vue.use(Moment);
Vue.component('icon', Icon);
Vue.use(Buefy);
Vue.use(Toasted);

const authenticated = localStorage.vuex ? !_.isNull(JSON.parse(localStorage.vuex).auth) : false ;

if (authenticated) {
  const token = JSON.parse(localStorage.getItem('vuex')).auth.token;
  axios.defaults.headers.common['Authorization'] = token;
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
