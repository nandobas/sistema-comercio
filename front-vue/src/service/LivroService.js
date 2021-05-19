import axios from "axios";

export default class LivroService {
  getLivros() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/livro/list")
      .then((res) => {
        return res.data;
      });
  }
  getLivro(p_id_livro) {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/livro/get/" + p_id_livro)
      .then((res) => {
        return res.data;
      });
  }

  saveLivro(p_Livro) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/livro/save",
        Object.assign({}, p_Livro)
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteLivro(p_IdLivro) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/livro/delete/" + p_IdLivro)
      .then((response) => {
        return response.data;
      });
  }
}
