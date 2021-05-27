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
      this.$auth.register({
        data: {
          email: app.email,
          password: app.password,
          password_confirmation: app.password_confirmation,
        },
        success: function() {
          app.success = true;
          this.$router.push({
            name: "login",
            params: { successRegistrationRedirect: true },
          });
        },
        error: function(res) {
          console.log(res.response.data.errors);
          app.has_error = true;
          app.error = res.response.data.error;
          app.errors = res.response.data.errors || {};
        },
      });
    },
  },
};
