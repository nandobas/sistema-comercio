import axios from "axios";

export default class IndiceService {
  getIndices() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/indice/list")
      .then((res) => {
        return res.data;
      });
  }

  saveSubdivisaoIndice(p_SubdivisaoIndice) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/indice/create",
        Object.assign({}, p_SubdivisaoIndice)
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteSubdivisaoIndice(p_IdSubdivisaoIndice) {
    return await axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/subdivisao_indice/delete/" +
          p_IdSubdivisaoIndice
      )
      .then((response) => {
        return response.data;
      });
  }
}
