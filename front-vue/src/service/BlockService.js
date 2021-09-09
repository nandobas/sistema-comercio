import axios from "axios";

export default class BlockService {
  getBlocks() {
    return axios.get(process.env.VUE_APP_ROOT_API + "/block").then((res) => {
      return res.data;
    });
  }

  async searchBlocks(p_query) {
    return await axios
      .get(process.env.VUE_APP_ROOT_API + "/block/buscar/" + p_query)
      .then((res) => {
        return res.data.docs;
      });
  }

  saveBlock(p_Block) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/block/save", {
        data: p_Block,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteBlock(p_Block) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/block/remove",
        Object.assign({}, p_Block)
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
