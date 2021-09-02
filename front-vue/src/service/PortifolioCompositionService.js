import axios from "axios";

export default class PortifolioCompositionService {
  getPortifolioCompositions() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/portifolio_composition")
      .then((res) => {
        return res.data;
      });
  }

  savePortifolioComposition(p_PortifolioComposition) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/portifolio_composition/save", {
        data: p_PortifolioComposition,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deletePortifolioComposition(p_PortifolioComposition) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/portifolio_composition/remove",
        Object.assign({}, p_PortifolioComposition)
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
