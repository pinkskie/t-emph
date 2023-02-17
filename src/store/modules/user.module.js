import api from "@/services/api";
import { createStore } from "vuex";

export const userModule = {
  state: {
    usersList: [],
    loading: false,
  },
  getters: {
    getUsersList:
      (state) =>
      ({ query = "", sort = true }) => {
        const isExist = ({ username }) =>
          username.toLowerCase().includes(query.toLowerCase());

        return sort
          ? state.usersList.filter(isExist)
          : [...state.usersList].filter(isExist).sort((a, b) => b.id - a.id);
      },
  },
  mutations: {
    GET_USERS_LIST(state, payload) {
      state.usersList = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getUsersList({ commit }) {
      try {
        commit("SET_LOADING", true);
        const data = await api.getUsers();
        commit("GET_USERS_LIST", data);
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
