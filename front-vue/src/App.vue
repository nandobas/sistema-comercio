<template>
  <div>
    <Toast />
    <div id="nav">
      <div v-if="bl_state_token">
        <router-link to="/">Home</router-link> |
        <router-link to="/client">Clientes</router-link> |
        <router-link to="/logout" @click="bl_state_token = false"
          >Sair</router-link
        >
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/service/api.js";
import { mapGetters } from "vuex";
export default {
  name: "App",
  mounted() {},
  data() {
    return {
      app_home: process.env.VUE_APP_HOME,
    };
  },
  computed: {
    //   ...mapGetters("token", {
    //     bl_state_token: "getStateToken",
    //   }),

    bl_state_token: {
      get() {
        return this.$store.state.token.bl_state_token;
      },
      set(newValue) {
        this.$store.commit("token/setStateToken", newValue);
      },
    },
  },
  mounted: function() {
    Object.noty = this.$noty;
    this.$root.$api = new Api();
    if (localStorage.getItem("token")) {
      this.bl_state_token = true;
    } else {
      /*this.$router.push({
        path: "/login",
      });*/
    }
  },
  methods: {
    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      });
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
