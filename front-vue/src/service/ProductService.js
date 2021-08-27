import axios from "axios";

export default class ProductService {
  getProducts() {
    return axios.get(process.env.VUE_APP_ROOT_API + "/product").then((res) => {
      return res.data;
    });
  }

  saveProduct(p_Product) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + "/product/save", {
        data: p_Product,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  async deleteProduct(p_Product) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + "/product/remove",
        Object.assign({}, p_Product)
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
