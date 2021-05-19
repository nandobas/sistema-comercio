<template>
  <div class="home">
    {{ objLivro }}
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      objLivro: {},
      idLivro: null,
    };
  },
  mounted() {
    this.idLivro = this.$route.params.idLivro;
    this.getLivro();
  },
  methods: {
    getLivro() {
      console.log("teste", this.idLivro);
    },
  },
};
</script>
