import User from "./../../Api/User";
// import router from "./../../router";

const state = {
  authenticated: false,
  user: null,
};

const getters = {
  authenticated(state) {
    return state.authenticated;
  },

  user(state) {
    return state.user;
  },
};

const actions = {
  async signIn({ dispatch, commit }, credentials) {
    return new Promise((resolve, reject) => {
      User.login(credentials)
        .then((response) => {
          commit("SET_AUTHENTICATED", true);
          commit("SET_USER", response.data);
          resolve({
            isFulfilled: true,
            response: response.data,
          });
          return dispatch("me");
        })
        .catch((error) => {
          reject({ isFulfilled: false, error: error });
        });
    });
  },

  async signOut({ commit }) {
    return new Promise((resolve, reject) => {
      User.logout().then(() => {
        commit("SET_AUTHENTICATED", false);
        commit("SET_USER", null);
        resolve({ isFulfilled: true})

      })
      .catch( (error) => {
        reject({isFulfilled: false, error})
      })
    })
  },

  me({ commit }) {
    return User.auth()
      .then((response) => {
        commit("SET_AUTHENTICATED", true);
        commit("SET_USER", response.data);
      })
      .catch(() => {
        commit("SET_AUTHENTICATED", false);
        commit("SET_USER", null);
      });
  },
};

const mutations = {
  SET_AUTHENTICATED(state, value) {
    state.authenticated = value;
  },
  SET_USER(state, value) {
    state.user = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
