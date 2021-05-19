import ArquivoService from "../../service/ArquivoService";
import FormaLegislacaoService from "../../service/FormaLegislacaoService";
import LegislacaoService from "../../service/LegislacaoService";
import FormasService from "../../service/FormasService";
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
      legislacoes: null,
      formas_legislacao: null,
      filters: null,
      loading: true,
      legislacaoDialog: false,
      deleteLegislacaoDialog: false,
      deleteLegislacoesDialog: false,
      arquivo: { id_arquivo: 0, nome_arquivo: "" },
      forma_legislacao: { legislacao: {} },
      legislacao_parent: {
        forma: { titulo: "" },
        legislacao: { descricao: "" },
      },
      arr_legislacao_parents: [],
      selectedLegislacoes: null,

      selectedTipo: null,
      submitted: false,
      fileId: 0,
      fileName: "",
      parentId: 0,
    };
  },
  ArquivoService: null,
  FormaLegislacaoService: null,
  LegislacaoService: null,
  FormasService: null,
  created() {
    this.ArquivoService = new ArquivoService();
    this.FormaLegislacaoService = new FormaLegislacaoService();
    this.LegislacaoService = new LegislacaoService();
    this.FormasService = new FormasService();
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
    this.FormasService.getFormas().then((registros) => {
      this.formas_legislacao = registros.docs;
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
      await this.FormaLegislacaoService.getLegislacoesFromParent(
        p_to.params.fileId,
        p_to.params.parentId
      ).then((data) => {
        this.legislacoes = data.docs;

        this.ArquivoService.getArquivo(this.fileId).then((data) => {
          this.arquivo = data;
        });

        this.loadParents(this.parentId);

        this.loading = false;
      });
    },
    openChidrens(event) {
      this.parentId = event.data.id_forma_legislacao;
      this.$router.push({
        path: "/legislacoes/" + this.fileId + "/" + this.parentId,
      });
      this.loadTo(this.$route);
    },

    openNew() {
      this.forma_legislacao = { legislacao: {} };
      this.submitted = false;
      this.legislacaoDialog = true;
    },
    hideDialog() {
      this.legislacaoDialog = false;
      this.submitted = false;
    },
    getTituloForma(p_id_forma) {
      if (this.formas_legislacao) {
        let res = this.formas_legislacao.filter(function(n, i) {
          return n.id_forma === p_id_forma;
        });
        return res[0].titulo;
      }
      return "";
    },

    findIndexById(p_id_forma_legislacao) {
      let index = -1;
      for (let i = 0; i < this.legislacoes.length; i++) {
        if (this.legislacoes[i].id_forma_legislacao === p_id_forma_legislacao) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveLegislacao() {
      this.submitted = true;

      if (
        !(
          this.forma_legislacao.legislacao.descricao &&
          this.forma_legislacao.legislacao.descricao.trim()
        )
      )
        return false;

      let objFormaLegislacao = { ...this.forma_legislacao };

      objFormaLegislacao.id_arquivo = this.fileId;
      objFormaLegislacao.id_relacao = this.parentId;
      objFormaLegislacao.id_forma = this.selectedTipo;
      objFormaLegislacao.legislacao.id_legislacao = this.forma_legislacao
        .legislacao.id_legislacao
        ? this.forma_legislacao.legislacao.id_legislacao
        : 0;
      objFormaLegislacao.legislacao.id_entidade_origem = 2;
      objFormaLegislacao.legislacao.base_lei = "original";
      objFormaLegislacao.legislacao.descricao = this.forma_legislacao.legislacao.descricao;

      this.LegislacaoService.saveFormaLegislacao(objFormaLegislacao).then(
        (data) => {
          if (objFormaLegislacao.legislacao.id_legislacao) {
            this.legislacoes[
              this.findIndexById(objFormaLegislacao.id_forma_legislacao)
            ] = objFormaLegislacao;
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Atualizado",
              life: 3000,
            });
          } else {
            objFormaLegislacao.id_forma_legislacao = data.id_forma_legislacao;
            objFormaLegislacao.id_legislacao = data.id_legislacao;
            objFormaLegislacao.legislacao.id_legislacao = data.id_legislacao;
            this.legislacoes.push(objFormaLegislacao);
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Criado",
              life: 3000,
            });
          }
        }
      );

      this.legislacaoDialog = false;
      this.forma_legislacao = {};
    },
    editLegislacao(p_forma_legislacao) {
      this.forma_legislacao = { ...p_forma_legislacao.data };
      this.selectedTipo = this.forma_legislacao.id_forma;
      this.legislacaoDialog = true;
    },
    confirmDeleteArquivo(forma_legislacao) {
      this.forma_legislacao = forma_legislacao;
      this.deleteLegislacaoDialog = true;
    },
    deleteLegislacao() {
      this.legislacoes = this.legislacoes.filter(
        (val) => val.id_legislacao !== this.legislacoes.id_forma_legislacao
      );
      this.deleteLegislacaoDialog = false;
      this.legislacoes = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteLegislacoesDialog = true;
    },
    async deleteSelectedLegislacoes() {
      let legislacaoService = new LegislacaoService();
      let Toast = this.$toast;
      let arr_legislacoes = this.legislacoes;
      this.selectedLegislacoes.forEach((objRegistro) => {
        let id_forma_legislacao = objRegistro.id_forma_legislacao;
        legislacaoService
          .deleteFormaLegislacao(id_forma_legislacao)
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
              detail: "Registro COD:" + id_forma_legislacao + " Deletado!",
              life: 3000,
            });
            this.legislacoes = this.legislacoes.filter((val) => {
              return val.id_forma_legislacao !== id_forma_legislacao;
            });
          });
      });

      this.deleteLegislacoesDialog = false;
      this.selectedLegislacoes = null;
    },
    loadParents(p_id_forma_legislacao_filho) {
      let fileId = this.fileId;
      this.FormaLegislacaoService.getParents(p_id_forma_legislacao_filho).then(
        (data) => {
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
                  "/legislacoes/" +
                  fileId +
                  "/" +
                  (parent_id && parent_id !== null ? parent_id : item.id),
                id: item.id,
                parentId: item.parentId,
                key: item.key,
                id_forma: item.id_forma,
                titulo: item.titulo,
                label:
                  item.titulo == "arquivo" ? item.nome_arquivo : item.titulo,
                nivel: item.nivel,
                nome_entidade: item.nome_entidade,
                nome_arquivo: item.nome_arquivo,
                data_criacao: item.data_criacao,
                base_lei: item.base_lei,
                custom: item.custom,
              };
            });
          this.arr_legislacao_parents = new_array;
          console.log(new_array);
        }
      );
    },
    getFormaLegislacaoSelecionada() {
      if (this.arr_legislacao_parents.length > 0) {
        let position = this.arr_legislacao_parents.length - 1;
        return this.arr_legislacao_parents[position]; //ponta
      }
      return "-";
    },
  },
};
