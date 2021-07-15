<template>
  <div class="container">
    Logout...
  </div>
</template>
<script>
export default {
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      var app = this;
      this.$root.$api
        .post("/auth/logout", {})
        .then((response) => {
          if (response.status == "success") {
            app.success = true;
            this.$router.push({
              name: "login",
            });

            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } else if (response.status == "error") {
            console.log(response.errors);
          }
        })
        .catch((res) => {
          console.log(res.errors);
        });
    },
  },
};
</script>
