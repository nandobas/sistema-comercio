import axios from "axios";

export default class LegislacaoService {
  getLegislacoes() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/legislacao/list")
      .then((res) => {
        return res.data;
      });
  }

  saveFormaLegislacao(p_FormaLegislacao) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/legislacao/create",
        Object.assign({}, p_FormaLegislacao)
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteFormaLegislacao(p_IdFormaLegislacao) {
    return await axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/forma_legislacao/delete/" +
          p_IdFormaLegislacao
      )
      .then((response) => {
        return response.data;
      });
  }
}
