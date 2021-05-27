import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      email: "rodnei@test.com",
      password: "mypassword",
      has_error: false,
    };
  },
  created() {},
  mounted() {
    //
  },
  methods: {
    login() {
      var app = this;
      this.$root.$api
        .login("/auth/login", {
          email: app.email,
          password: app.password,
        })
        .then((response) => {
          // // handle redirection
          // const redirectTo = redirect
          //   ? redirect.from.name
          //   : this.$auth.user().role === 2
          //   ? "admin.dashboard"
          //   : "dashboard";
          let token = response.headers.authorization;
          let authorized = VueJwtDecode.decode(token);
          localStorage.setItem("token", token);
          this.$root.$api.token = token;

          this.$router.push({
            path: "/auth/" + authorized.sub,
          });
        });
    },
  },
};
