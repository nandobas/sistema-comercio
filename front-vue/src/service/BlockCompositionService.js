import axios from "axios";

export default class BlockCompositionService {
  getBlockCompositions(p_compositionId) {
    let objSearch = {
      composition_id: p_compositionId,
    };
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/block_composition/filter/" +
          JSON.stringify(objSearch)
      )
      .then((res) => {
        return res.data;
      });
  }
  getBlockComposition(p_blockCompositionId) {
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/block_composition/" +
          p_blockCompositionId
      )
      .then((res) => {
        return res.data;
      });
  }

  async saveBlockComposition(p_BlockComposition) {
    return await axios
      .post(process.env.VUE_APP_ROOT_API + "/block_composition/save", {
        data: p_BlockComposition,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteBlockComposition(p_BlockComposition) {
    let tmpObjCompositionService = {
      data: {
        int_cod: p_BlockComposition,
      },
    };
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/block_composition/remove",
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
