import PortifolioService from "../../service/PortifolioService";

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
      portifolios: null,
      portifolio: {},
      filters: null,
      loading: true,
      portifolioDialog: false,
      deletePortifolioDialog: false,
      deletePortifoliosDialog: false,
      selectedPortifolios: null,

      submitted: false,
      intId: 0,
    };
  },
  PortifolioService: null,
  created() {
    this.portifolioService = new PortifolioService();
    this.initFilters();
  },
  mounted() {
    this.portifolioService.getPortifolios().then((data) => {
      this.portifolios = data.docs;
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
      this.portifolioDialog = true;
    },
    hideDialog() {
      this.portifolioDialog = false;
      this.submitted = false;
    },

    findIndexById(p_portifolio_id) {
      let index = -1;
      for (let i = 0; i < this.portifolios.length; i++) {
        if (this.portifolios[i].portifolio_id === p_portifolio_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    savePortifolio() {
      this.submitted = true;

      if (
        !(
          this.portifolio.portifolio_description &&
          this.portifolio.portifolio_description.trim()
        )
      )
        return false;

      let objPortifolio = { ...this.portifolio };

      this.portifolioService.savePortifolio(objPortifolio).then((data) => {
        if (objPortifolio.portifolio_id) {
          this.portifolios[
            this.findIndexById(objPortifolio.portifolio_id)
          ] = objPortifolio;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Atualizado",
            life: 3000,
          });
        } else {
          objPortifolio = data.return;
          this.portifolios.push(objPortifolio);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Criado",
            life: 3000,
          });
        }
      });

      this.portifolioDialog = false;
      this.portifolio = {};
    },
    editPortifolio(p_portifolio) {
      this.portifolio = { ...p_portifolio.data };
      //this.selectedTipo = this.portifolio.id_subdivisao;
      this.portifolioDialog = true;
    },
    confirmDeletePortifolio(portifolio) {
      this.portifolio = portifolio;
      this.deletePortifolioDialog = true;
    },
    deletePortifolio() {
      this.portifolios = this.portifolios.filter(
        (val) => val.portifolio_id !== this.portifolios.portifolio_id
      );
      this.deletePortifolioDialog = false;
      this.portifolios = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deletePortifoliosDialog = true;
    },
    async deleteSelectedPortifolios() {
      let portifolioService = new PortifolioService();
      let Toast = this.$toast;
      this.selectedPortifolios.forEach((objRegistro) => {
        let portifolio_id = objRegistro.portifolio_id;
        portifolioService.deleteSubdivisaoIndice(portifolio_id).then((data) => {
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
            detail: "Registro COD:" + portifolio_id + " Deletado!",
            life: 3000,
          });
          this.portifolios = this.portifolios.filter((val) => {
            return val.portifolio_id !== portifolio_id;
          });
        });
      });

      this.deletePortifoliosDialog = false;
      this.selectedPortifolios = null;
    },
  },
};
