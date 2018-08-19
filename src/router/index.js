import Vue from 'vue';
import Router from 'vue-router';
import CreateRoute from '@/components/CreateRoute';
import CreateTrip from '@/components/CreateTrip';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Verify from '@/components/Verify';
import SearchResult from '@/components/SearchedTrips';
import SearchSelected from '@/components/SearchSelected';
import Dashboard from '@/components/Dashboard/index';
import Ridesoffered from '@/components/Dashboard/Ridesoffered';
import Messages from '@/components/Dashboard/Messages';
import Profile from '@/components/Dashboard/Profile';
import ProfileGeneral from '@/components/Dashboard/ProfileComponents/general';
import ProfilePhoto from '@/components/Dashboard/ProfileComponents/photo';
import ProfileVerification from '@/components/Dashboard/ProfileComponents/verification';
import ProfileCar from '@/components/Dashboard/ProfileComponents/car';
import ProfilePreference from '@/components/Dashboard/ProfileComponents/preferences';
import ProfileRatingsRecieved from '@/components/Dashboard/ProfileComponents/ratingsrecieved';
import ProfileRatingsGiven from '@/components/Dashboard/ProfileComponents/ratingsgiven';
import ProfilePassword from '@/components/Dashboard/ProfileComponents/password';
import ProfileCloseAccount from '@/components/Dashboard/ProfileComponents/closeaccount';
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
      path: '/verify/:id',
      name: 'Verify',
      component: Verify
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
    },
    {
      path: '/search',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/search/selected',
      name: 'SearchSelected',
      component: SearchSelected
    },
    {
      path: '/dashboard',
      name: 'UserDashboard',
      component: Dashboard,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/ridesoffered',
      name: 'DashboardRidesOffered',
      component: Ridesoffered,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/messages',
      name: 'DashboardMessages',
      component: Messages,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/profile',
      name: 'DashboardProfile',
      component: Profile,
      children: [
        {
          path: 'general',
          component: ProfileGeneral
        },
        {
          path: 'photo',
          component: ProfilePhoto
        },
        {
          path: 'verification',
          component: ProfileVerification
        },
        {
          path: 'cardetails',
          component: ProfileCar
        },
        {
          path: 'preferences',
          component: ProfilePreference
        },
        {
          path: 'ratingsrecieved',
          component: ProfileRatingsRecieved
        },
        {
          path: 'ratingsgiven',
          component: ProfileRatingsGiven
        },
        {
          path: 'password',
          component: ProfilePassword
        },
        {
          path: 'closeaccount',
          component: ProfileCloseAccount
        }
      ],
      beforeEnter: ifAuthenticated
    }
  ]
});
