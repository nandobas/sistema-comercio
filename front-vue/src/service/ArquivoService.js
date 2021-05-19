import axios from "axios";

export default class ArquivoService {
  getArquivos() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/arquivo/list")
      .then((res) => {
        return res.data;
      });
  }
  getArquivo(p_id_arquivo) {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/arquivo/get/" + p_id_arquivo)
      .then((res) => {
        return res.data;
      });
  }

  saveArquivo(p_Arquivo) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/arquivo/save",
        Object.assign({}, p_Arquivo)
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteArquivo(p_IdArquivo) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/arquivo/delete/" + p_IdArquivo)
      .then((response) => {
        return response.data;
      });
  }
}
