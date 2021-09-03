import axios from "axios";

export default class PortifolioService {
  getPortifolios() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/portifolio")
      .then((res) => {
        return res.data;
      });
  }

  async searchPortifolios(p_query) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/portifolio/buscar/" + p_query)
      .then((res) => {
        return res.data.docs;
      });
  }

  savePortifolio(p_Portifolio) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/portifolio/save", {
        data: p_Portifolio,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deletePortifolio(p_Portifolio) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/portifolio/remove",
        Object.assign({}, p_Portifolio)
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }
}
