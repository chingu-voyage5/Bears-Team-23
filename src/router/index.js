import Vue from 'vue';
import Router from 'vue-router';
import CreateRoute from '@/components/CreateRoute';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateRoute',
      component: CreateRoute
    }
  ]
});
