import PortifolioCompositionService from "../../service/PortifolioCompositionService";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
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
    InputSwitch,
    Panel,
    Breadcrumb,
  },

  data() {
    return {
      app_home: process.env.VUE_APP_HOME,
      portifolio_compositions: null,
      portifolio_composition: {},
      filters: null,
      loading: true,
      portifolio_compositionDialog: false,
      deletePortifolioCompositionDialog: false,
      deletePortifolioCompositionsDialog: false,
      selectedPortifolioCompositions: null,

      submitted: false,
      intId: 0,
    };
  },
  PortifolioCompositionService: null,
  created() {
    this.portifolio_compositionService = new PortifolioCompositionService();
    this.initFilters();
  },
  mounted() {
    this.portifolio_compositionService
      .getPortifolioCompositions()
      .then((data) => {
        this.portifolio_compositions = data.docs;
        this.loading = false;
      });

    if (this.$route.params.intId) this.intId = this.$route.params.intId;
  },
  watch: {
    $route(to, from) {
      this.$nextTick(function() {
        this.loadTo(to);
      });
    },
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
    async loadTo(p_to = { params: { intId: 0 } }) {
      //this.loading = true;
      this.intId = p_to.params.intId;
    },

    openNew() {
      this.submitted = false;
      this.portifolio_compositionDialog = true;
    },
    hideDialog() {
      this.portifolio_compositionDialog = false;
      this.submitted = false;
    },

    findIndexById(p_portifolio_composition_id) {
      let index = -1;
      for (let i = 0; i < this.portifolio_compositions.length; i++) {
        if (
          this.portifolio_compositions[i].portifolio_composition_id ===
          p_portifolio_composition_id
        ) {
          index = i;
          break;
        }
      }

      return index;
    },
    savePortifolioComposition() {
      this.submitted = true;

      let objPortifolioComposition = { ...this.portifolio_composition };

      this.portifolio_compositionService
        .savePortifolioComposition(objPortifolioComposition)
        .then((data) => {
          if (objPortifolioComposition.portifolio_composition_id) {
            this.portifolio_compositions[
              this.findIndexById(
                objPortifolioComposition.portifolio_composition_id
              )
            ] = objPortifolioComposition;
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Atualizado",
              life: 3000,
            });
          } else {
            objPortifolioComposition = data.return;
            this.portifolio_compositions.push(objPortifolioComposition);
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Criado",
              life: 3000,
            });
          }
        });

      this.portifolio_compositionDialog = false;
      this.portifolio_composition = {};
    },
    editPortifolioComposition(p_portifolio_composition) {
      this.portifolio_composition = { ...p_portifolio_composition.data };
      this.portifolio_compositionDialog = true;
    },
    confirmDeletePortifolioComposition(portifolio_composition) {
      this.portifolio_composition = portifolio_composition;
      this.deletePortifolioCompositionDialog = true;
    },
    deletePortifolioComposition() {
      this.portifolio_compositions = this.portifolio_compositions.filter(
        (val) =>
          val.portifolio_composition_id !==
          this.portifolio_compositions.portifolio_composition_id
      );
      this.deletePortifolioCompositionDialog = false;
      this.portifolio_compositions = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deletePortifolioCompositionsDialog = true;
    },
    async deleteSelectedPortifolioCompositions() {
      let portifolio_compositionService = new PortifolioCompositionService();
      let Toast = this.$toast;
      this.selectedPortifolioCompositions.forEach((objRegistro) => {
        let portifolio_composition_id = objRegistro.portifolio_composition_id;
        portifolio_compositionService
          .deleteSubdivisaoIndice(portifolio_composition_id)
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
              detail:
                "Registro COD:" + portifolio_composition_id + " Deletado!",
              life: 3000,
            });
            this.portifolio_compositions = this.portifolio_compositions.filter(
              (val) => {
                return (
                  val.portifolio_composition_id !== portifolio_composition_id
                );
              }
            );
          });
      });

      this.deletePortifolioCompositionsDialog = false;
      this.selectedPortifolioCompositions = null;
    },
  },
};
