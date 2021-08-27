import axios from "axios";

export default class ProviderService {
  getProviders() {
    return axios.get(process.env.VUE_APP_ROOT_API + "/provider").then((res) => {
      return res.data;
    });
  }

  saveProvider(p_Provider) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/provider/save", {
        data: p_Provider,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteProvider(p_Provider) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/provider/remove",
        Object.assign({}, p_Provider)
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
