import Vue from 'vue';
import Router from 'vue-router';
import CreateRoute from '@/components/CreateRoute';
import CreateTrip from '@/components/CreateTrip';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import store from '@/store/store';

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
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: ifNotAuthenticated
    },
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
    },
    {
      path: '/trip/create',
      name: 'CreateTrip',
      component: CreateTrip,
      beforeEnter: ifAuthenticated
    }
  ]
});
