import axios from "axios";

export default class CompositionService {
  async getComposition(p_composition_id) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/composition/" + p_composition_id)
      .then((res) => {
        return res.data.docs[0];
      });
  }

  getCompositions() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/composition")
      .then((res) => {
        return res.data;
      });
  }

  async searchCompositions(p_query) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/composition/buscar/" + p_query)
      .then((res) => {
        return res.data.docs;
      });
  }

  saveComposition(p_Composition) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/composition/save", {
        data: p_Composition,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteComposition(p_Composition) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/composition/remove",
        Object.assign({}, p_Composition)
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
