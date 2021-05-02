import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    nowSocieties: {}, // 当前社团
    societiesType: [],
    societiesJobs: [],
    societiesPersonnel: [],
    activityType: [],
    affairsType: [
      {
        id: 1,
        typeName: '加入社团',
      }, {
        id: 2,
        typeName: '创建社团',
      }, {
        id: 3,
        typeName: '申请经费',
      }, {
        id: 4,
        typeName: '日常事务',
      },
    ],
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
    saveNowSocieties(state, info) {
      state.nowSocieties = info;
    },
    reset(state) {
      state.nowSocieties = {};
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
