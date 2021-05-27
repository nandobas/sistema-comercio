<template>
  <Toast />
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/client">Clientes</router-link>
  </div>
  <router-view />
</template>

<script>
import Api from "@/service/api.js";
export default {
  name: "App",
  mounted() {},
  data() {
    return {
      app_home: process.env.VUE_APP_HOME,
      isSetToken: false,
    };
  },
  mounted: function() {
    Object.noty = this.$noty;
    this.$root.$api = new Api();
    if (localStorage.getItem("token")) {
      this.isSetToken = true;
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
