import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import { pick } from 'lodash';

Vue.use(Vuex);

const state = {
  auth: null,
  searchResult: null,
  searchParams: null,
  selectedIndex: null
};

const getters = {
  user(state) {
    return state.auth ? state.auth : {};
  },
  isAuthenticated(state) {
    return state.auth ? !!state.auth.token : false;
  },
  token(state) {
    return state.auth ? state.auth.token : '';
  },
  search(state) {
    return state.searchResult ? state.searchResult : '';
  },
  searchParams(state) {
    return state.searchParams ? state.searchParams : '';
  }
};

const mutations = {
  set_auth(state, authData) {
    state.auth = authData;
  },
  set_search_params(state, payload) {
    state.searchParams = payload;
  },
  set_search(state, payload) {
    state.searchResult = payload;
  },
  selected_search(state, payload) {
    state.selectedIndex = payload;
  }
};

const actions = {
  async login({ commit }, credentials) {
    const response = await axios.post(
      'http://localhost:5000/api/login',
      credentials
    );
    const { data } = response.data;
    commit('set_auth', data);
    return data;
  },

  async logout({ commit }) {
    return new Promise(resolve => {
      commit('set_auth', null);
      localStorage.removeItem('vuex');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  },

  async signup({ commit }, credentials) {
    
    const response = await axios.post(
      'http://localhost:5000/api/signup',
      credentials
    );
    const { data } = response.data;
    return user;
  },

  async searchTrip({ commit }, search) {
    const rideResults = (await axios.get('http://localhost:5000/api/find', {
      params: search
    })).data.data;
    commit('set_search_params', search);
    commit('set_search', rideResults);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});
