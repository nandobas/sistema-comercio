import axios from "axios";

export default class BlockItemService {
  getBlockItems(p_block_composition_id) {
    let objSearch = {
      block_composition_id: p_block_composition_id,
    };
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/block_item/filter/" +
          JSON.stringify(objSearch)
      )
      .then((res) => {
        return res.data;
      });
  }

  async saveBlockItem(p_BlockItem) {
    return await axios
      .post(process.env.VUE_APP_ROOT_API + "/block_item/save", {
        data: p_BlockItem,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteBlockItem(p_BlockItem) {
    let tmpObjBlockItem = {
      data: {
        int_cod: p_BlockItem,
      },
    };
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/block_item/remove",
        Object.assign({}, tmpObjBlockItem)
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
