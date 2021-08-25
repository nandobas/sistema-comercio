export default {
  namespaced: true,
  state: () => ({
    bl_state_token: false,
  }),
  getters: {
    getStateToken(state) {
      return state.bl_state_token;
    },
  },
  mutations: {
    setStateToken(state, payload) {
      state.bl_state_token = payload;
    },
  },
  actions: {},
};
