import router from "../../router";
import store from "@/store";

export default {
  data() {
    return {
      erro: false,
      loading: true,
    };
  },
  computed: {
    bl_state_token: {
      get() {
        return this.$store.state.token.bl_state_token;
      },
      set(newValue) {
        this.$store.commit("token/setStateToken", newValue);
      },
    },
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

          //this.store.commit("token/setStateToken", true);

          this.bl_state_token = true;

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
