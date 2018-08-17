import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
  auth: null,
  token: null,
  searchResult: null,
  searchParams: null,
  selectedIndex: null
};

const getters = {
  user(state) {
    return state.auth ? state.auth : {};
  },
  isAuthenticated(state) {
    return state.token ? !!state.token : false;
  },
  token(state) {
    return state.token ? state.token : '';
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
  set_image(state, image) {
    state.auth.image = image;
  },
  set_car_image(state, image) {
    state.auth.car.image = image;
  },
  set_token(state, tokenData) {
    state.token = tokenData;
  },
  set_pref(state, preference) {
    state.auth.pref = preference;
  },
  set_car(state, car) {
    state.auth.car = car;
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
    const response = await axios.post('/login', credentials);
    const { data } = response.data;
    commit('set_token', data.token);
    delete data.token;
    commit('set_auth', data);
    return data;
  },

  async logout({ commit }) {
    return new Promise(resolve => {
      commit('set_auth', null);
      commit('set_token', null);
      localStorage.removeItem('vuex');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  },

  async signup({ commit }, credentials) {
    const response = await axios.post('/signup', credentials);
    const { data } = response.data;
    return data;
  },

  async searchTrip({ commit }, search) {
    console.log(search, 'yes');
    const options = {
      params: search
    };
    if (this.getters.isAuthenticated)
      options.params.loggedUser = this.getters.user._id;

    const rideResults = (await axios.get('/find', options)).data.data;
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
