import axios from "axios";
import Vuex from "vuex";

axios.defaults.withCredentials = true;

const store = new Vuex.Store({
  state: {
    currUser: {},
  },
  getters: {
    currUser(state) {
      return state.currUser;
    },
  },
  actions: {
    async checkAuth() {
      try {
        const checkToken = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/verify`
        );
        return checkToken.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getCurrUser({ commit }) {
      try {
        const currUser = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/me`
        );
        commit("SET_CURRENT_USER", currUser.data);
        return currUser.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currUser = user;
    },
  },
});

export default store;
