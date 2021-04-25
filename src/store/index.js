import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    societiesType: [],
    societiesJobs: [],
    societiesPersonnel: [],
    activityType: [],
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
    saveActivityType(state, info) {
      state.activityType = info;
    },
    reset(state) {
      state.userInfo = {};
      state.activityType = {};
      state.societiesPersonnel = {};
      state.societiesJobs = {};
      state.societiesType = {};
    },
  },
  actions: {},
  modules: {},
});
