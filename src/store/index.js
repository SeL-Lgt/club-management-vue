import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    societiesType: [],
    societiesJobs: [],
    societiesPersonnel: [],
  },
  mutations: {
    saveUserInfo(state, info) {
      state.userInfo = info;
      this.commit('saveSocietiesPersonnel', info.societiesPersonnel);
    },
    saveSocietiesType(state, info) {
      state.societiesType = info;
    },
    saveSocietiesJobs(state, info) {
      state.societiesJobs = info;
    },
    saveSocietiesPersonnel(state, info) {
      state.societiesPersonnel = info;
    },

  },
  actions: {},
  modules: {},
});
