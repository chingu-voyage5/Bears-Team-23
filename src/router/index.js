import Vue from 'vue';
import Router from 'vue-router';
import CreateRoute from '@/components/CreateRoute';
import Login from '@/components/Login';
import store from '@/store/store'; // your vuex store

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/route/create',
      name: 'CreateRoute',
      component: CreateRoute,
      beforeEnter: ifAuthenticated
    }
  ]
});
