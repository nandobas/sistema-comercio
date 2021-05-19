import axios from "axios";

export default class FormasService {
  getFormas() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/forma/list")
      .then((res) => res.data);
  }
}
