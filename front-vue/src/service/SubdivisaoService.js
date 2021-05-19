import axios from "axios";

export default class SubdivisaoService {
  getSubdivisoes() {
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/subdivisao/list")
      .then((res) => res.data);
  }
}
