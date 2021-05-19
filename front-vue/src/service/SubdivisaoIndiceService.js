import axios from "axios";

export default class SubdivisaoIndiceService {
  getIndicesFromParent(idLivro, idRelacao = 0) {
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/subdivisao_indice/list_with_parent/?id_livro=" +
          idLivro +
          "&id_relacao=" +
          idRelacao
      )
      .then((res) => {
        return res.data;
      });
  }

  getParents(p_id_child) {
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/subdivisao_indice/view_flat_parents_indices/?id_child=" +
          p_id_child
      )
      .then((response) => {
        return response.data;
      });
  }
}
