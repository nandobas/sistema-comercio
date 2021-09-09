import axios from "axios";

export default class PortifolioCompositionService {
  getPortifolioCompositions(p_portifolio_id) {
    let objSearch = { portifolio_id: p_portifolio_id };
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/portifolio_composition/filter/" +
          JSON.stringify(objSearch)
      )
      .then((res) => {
        return res.data;
      });
  }

  async savePortifolioComposition(p_PortifolioComposition) {
    return await axios
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
    let tmpObjCompositionService = {
      data: {
        int_cod: p_PortifolioComposition,
      },
    };
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/portifolio_composition/remove",
        Object.assign({}, tmpObjCompositionService)
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
