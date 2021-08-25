import router from "../../router";

export default {
  data() {
    return {
      erro: false,
      loading: true,
    };
  },
  mounted() {
    //this.limpaLS();

    if (localStorage.getItem("token")) {
      let token = "Bearer " + localStorage.getItem("token");
      let sub = this.$route.params.sub;
      this.$root.$api
        .get("/users/" + sub, token)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.user));
          this.$emit("setStateToken", true);
          router.push({
            path: "/",
          });
        })
        .catch((error) => {
          console.log("errou");
          router.push({
            path: "/",
          });
        });
    }
  },
  methods: {
    limpaLS: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
};
