import axios from "axios";

export default class TechnicalFormService {
  getTechnicalForms() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/technical_form")
      .then((res) => {
        return res.data;
      });
  }

  async searchTechnicalForms(p_query) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/technical_form/buscar/" + p_query)
      .then((res) => {
        return res.data.docs;
      });
  }

  saveTechnicalForm(p_TechnicalForm) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/technical_form/save", {
        data: p_TechnicalForm,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteTechnicalForm(p_TechnicalForm) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/technical_form/remove",
        Object.assign({}, p_TechnicalForm)
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
