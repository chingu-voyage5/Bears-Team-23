// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.BASEURL_DEV;
} else axios.defaults.baseURL = process.env.BASEURL_PROD;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
