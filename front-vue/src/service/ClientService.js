import axios from "axios";

export default class IndiceService {
  getClients() {
    return axios.get(process.env.VUE_APP_ROOT_API + "/client").then((res) => {
      return res.data;
    });
  }

  saveClient(p_Client) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/client/save", { data: p_Client })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteClient(p_Client) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/client/remove",
        Object.assign({}, p_Client)
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
