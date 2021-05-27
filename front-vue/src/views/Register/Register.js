export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      has_error: false,
      error: "",
      errors: {},
      success: false,
    };
  },
  methods: {
    register() {
      var app = this;
      this.$root.$api
        .post("/auth/register", {
          email: app.email,
          password: app.password,
          password_confirmation: app.password_confirmation,
        })
        .then((response) => {
          if (response.status == "success") {
            app.success = true;
            this.$router.push({
              name: "login",
              params: { successRegistrationRedirect: true },
            });
          } else if (response.status == "error") {
            console.log(response.errors);
            app.has_error = true;
            app.error = response.error;
            app.errors = response.errors || {};
          }
        })
        .catch((res) => {
          console.log(res.response.data.errors);
          app.has_error = true;
          app.error = res.response.data.error;
          app.errors = res.response.data.errors || {};
        });
    },
  },
};
