import axios from "axios";

export default class FormaLegislacaoService {
  getLegislacoesFromParent(idArquivo, idRelacao = 0) {
    return axios
      .get(
        process.env.VUE_APP_ROOT_API +
          "/forma_legislacao/list_with_parent/?id_arquivo=" +
          idArquivo +
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
          "/forma_legislacao/view_flat_parents/?id_child=" +
          p_id_child
      )
      .then((response) => {
        return response.data;
      });
  }
}
