import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
  auth: null
};

const getters = {
  user(state) {
    return state.auth ? state.auth : {};
  },
  isAuthenticated(state) {
    return state.auth ? !!state.auth.tokens[0].token : '';
  },
  token(state) {
    return state.auth ? state.auth.tokens[0].token : '';
  }
};

const mutations = {
  set_auth(state, authData) {
    state.auth = authData;
  }
};

const actions = {
  async login({ commit }, credentials) {
    const response = await axios.post(
      'http://localhost:5000/api/login',
      credentials
    );
    const data = response.data.data;

    const user = pick(data, [
      'email',
      'first_name',
      'last_name',
      'role',
      'tokens',
      '_id'
    ]);
    commit('set_auth', user);
    return data;
  },

  async logout({commit}) {
    return new Promise((resolve) => {
      commit('set_auth', null);
      localStorage.removeItem('vuex');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});
