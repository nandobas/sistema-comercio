import LivroService from "../../service/LivroService";
import SubdivisaoIndiceService from "../../service/SubdivisaoIndiceService";
import IndiceService from "../../service/IndiceService";
import SubdivisaoService from "../../service/SubdivisaoService";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Panel from "primevue/panel";
import Breadcrumb from "primevue/breadcrumb";
import { FilterMatchMode } from "primevue/api";

export default {
  components: {
    DataTable,
    Column,
    Toolbar,
    Dialog,
    Textarea,
    Dropdown,
    RadioButton,
    InputNumber,
    Panel,
    Breadcrumb,
  },

  data() {
    return {
      app_home: process.env.VUE_APP_HOME,
      indices: null,
      subdivisoes_indice: null,
      filters: null,
      loading: true,
      indiceDialog: false,
      deleteIndiceDialog: false,
      deleteIndicesDialog: false,
      livro: { id_livro: 0, nome_livro: "" },
      subdivisao_indice: { indice: {} },
      indice_parent: {
        subdivisao: { titulo: "" },
        indice: { descricao: "" },
      },
      arr_indice_parents: [],
      selectedIndices: null,

      selectedTipo: null,
      submitted: false,
      fileId: 0,
      fileName: "",
      parentId: 0,
    };
  },
  LivroService: null,
  SubdivisaoIndiceService: null,
  IndiceService: null,
  SubdivisaoService: null,
  created() {
    this.LivroService = new LivroService();
    this.SubdivisaoIndiceService = new SubdivisaoIndiceService();
    this.IndiceService = new IndiceService();
    this.SubdivisaoService = new SubdivisaoService();
    this.initFilters();
  },
  watch: {
    $route(to, from) {
      this.$nextTick(function() {
        this.loadTo(to);
      });
    },
  },
  mounted() {
    this.SubdivisaoService.getSubdivisoes().then((registros) => {
      this.subdivisoes_indice = registros.docs;
    });

    this.parentId = this.$route.params.parentId;
    this.fileId = this.$route.params.fileId;
    this.loadTo(this.$route);
  },
  beforeUnmount() {
    console.log("Main Vue destroyed");
  },
  computed: {},
  methods: {
    clearFilter() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    async loadTo(p_to = { params: { fileId: 0, parentId: 0 } }) {
      //this.loading = true;
      this.parentId = p_to.params.parentId;
      this.fileId = p_to.params.fileId;
      await this.SubdivisaoIndiceService.getIndicesFromParent(
        p_to.params.fileId,
        p_to.params.parentId
      ).then((data) => {
        this.indices = data.docs;

        this.LivroService.getLivro(this.fileId).then((data) => {
          this.livro = data;
        });

        this.loadParents(this.parentId);

        this.loading = false;
      });
    },
    openChidrens(event) {
      this.parentId = event.data.id_subdivisao_indice;
      this.$router.push({
        path: "/indices/" + this.fileId + "/" + this.parentId,
      });
      this.loadTo(this.$route);
    },

    openNew() {
      this.subdivisao_indice = { indice: {} };
      this.submitted = false;
      this.indiceDialog = true;
    },
    hideDialog() {
      this.indiceDialog = false;
      this.submitted = false;
    },
    getTituloSubdivisao(p_id_subdivisao) {
      if (this.subdivisoes_indice) {
        let res = this.subdivisoes_indice.filter(function(n, i) {
          return n.id_subdivisao === p_id_subdivisao;
        });
        return res[0].titulo;
      }
      return "";
    },

    findIndexById(p_id_subdivisao_indice) {
      let index = -1;
      for (let i = 0; i < this.indices.length; i++) {
        if (this.indices[i].id_subdivisao_indice === p_id_subdivisao_indice) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveIndice() {
      this.submitted = true;

      if (
        !(
          this.subdivisao_indice.indice.descricao &&
          this.subdivisao_indice.indice.descricao.trim()
        )
      )
        return false;

      let objSubdivisaoIndice = { ...this.subdivisao_indice };

      objSubdivisaoIndice.id_livro = this.fileId;
      objSubdivisaoIndice.id_relacao = this.parentId;
      objSubdivisaoIndice.id_subdivisao = this.selectedTipo;
      objSubdivisaoIndice.indice.id_indice = this.subdivisao_indice.indice
        .id_indice
        ? this.subdivisao_indice.indice.id_indice
        : 0;
      objSubdivisaoIndice.indice.id_entidade_origem = 2;
      objSubdivisaoIndice.indice.descricao = this.subdivisao_indice.indice.descricao;

      this.IndiceService.saveSubdivisaoIndice(objSubdivisaoIndice).then(
        (data) => {
          if (objSubdivisaoIndice.indice.id_indice) {
            this.indices[
              this.findIndexById(objSubdivisaoIndice.id_subdivisao_indice)
            ] = objSubdivisaoIndice;
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Atualizado",
              life: 3000,
            });
          } else {
            objSubdivisaoIndice.id_subdivisao_indice =
              data.id_subdivisao_indice;
            objSubdivisaoIndice.id_indice = data.id_indice;
            objSubdivisaoIndice.indice.id_indice = data.id_indice;
            this.indices.push(objSubdivisaoIndice);
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Criado",
              life: 3000,
            });
          }
        }
      );

      this.indiceDialog = false;
      this.subdivisao_indice = {};
    },
    editIndice(p_subdivisao_indice) {
      this.subdivisao_indice = { ...p_subdivisao_indice.data };
      this.selectedTipo = this.subdivisao_indice.id_subdivisao;
      this.indiceDialog = true;
    },
    confirmDeleteLivro(subdivisao_indice) {
      this.subdivisao_indice = subdivisao_indice;
      this.deleteIndiceDialog = true;
    },
    deleteIndice() {
      this.indices = this.indices.filter(
        (val) => val.id_indice !== this.indices.id_subdivisao_indice
      );
      this.deleteIndiceDialog = false;
      this.indices = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteIndicesDialog = true;
    },
    async deleteSelectedIndices() {
      let indiceService = new IndiceService();
      let Toast = this.$toast;
      let arr_indices = this.indices;
      this.selectedIndices.forEach((objRegistro) => {
        let id_subdivisao_indice = objRegistro.id_subdivisao_indice;
        indiceService
          .deleteSubdivisaoIndice(id_subdivisao_indice)
          .then((data) => {
            if (!data.deleted || data.menssage) {
              Toast.add({
                severity: "warn",
                summary: "Atenção!",
                detail: data.menssage,
                life: 5000,
              });

              return;
            }
            Toast.add({
              severity: "success",
              summary: "Feito!",
              detail: "Registro COD:" + id_subdivisao_indice + " Deletado!",
              life: 3000,
            });
            this.indices = this.indices.filter((val) => {
              return val.id_subdivisao_indice !== id_subdivisao_indice;
            });
          });
      });

      this.deleteIndicesDialog = false;
      this.selectedIndices = null;
    },
    loadParents(p_id_subdivisao_indice_filho) {
      let fileId = this.fileId;
      this.SubdivisaoIndiceService.getParents(
        p_id_subdivisao_indice_filho
      ).then((data) => {
        let new_array = [];
        if (data)
          new_array = data.map(function(item, i) {
            let info = { parentId: 0 };
            if (data[i + 1]) info = data[i + 1];
            let parent_id = info.parentId;
            if (parent_id == 0) parent_id = data.id;
            return {
              url:
                process.env.VUE_APP_HOME +
                "/indices/" +
                fileId +
                "/" +
                (parent_id && parent_id !== null ? parent_id : item.id),
              id: item.id,
              parentId: item.parentId,
              key: item.key,
              id_subdivisao: item.id_subdivisao,
              titulo: item.titulo,
              label: item.titulo == "livro" ? item.nome_livro : item.titulo,
              nivel: item.nivel,
              nome_entidade: item.nome_entidade,
              nome_livro: item.nome_livro,
              data_criacao: item.data_criacao,
              custom: item.custom,
            };
          });
        this.arr_indice_parents = new_array;
        console.log(new_array);
      });
    },
    getSubdivisaoIndiceSelecionada() {
      if (this.arr_indice_parents.length > 0) {
        let position = this.arr_indice_parents.length - 1;
        return this.arr_indice_parents[position]; //ponta
      }
      return "-";
    },
  },
};
