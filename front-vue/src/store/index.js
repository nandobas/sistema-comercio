import { createStore } from "vuex";

//import modules
import token from "./token";

export default new createStore({
  modules: {
    token: token,
  },
});
