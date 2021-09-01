import CompositionService from "../../service/CompositionService";
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
      compositions: null,
      composition: {},
      filters: null,
      loading: true,
      compositionDialog: false,
      deleteCompositionDialog: false,
      deleteCompositionsDialog: false,
      selectedCompositions: null,

      submitted: false,
      intId: 0,
    };
  },
  CompositionService: null,
  created() {
    this.compositionService = new CompositionService();
    this.initFilters();
  },
  mounted() {
    this.compositionService.getCompositions().then((data) => {
      this.compositions = data.docs;
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
      this.compositionDialog = true;
    },
    hideDialog() {
      this.compositionDialog = false;
      this.submitted = false;
    },

    findIndexById(p_composition_id) {
      let index = -1;
      for (let i = 0; i < this.compositions.length; i++) {
        if (this.compositions[i].composition_id === p_composition_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveComposition() {
      this.submitted = true;

      if (
        !(
          this.composition.composition_description &&
          this.composition.composition_description.trim()
        )
      )
        return false;

      if (
        !(
          this.composition.composition_name &&
          this.composition.composition_name.trim()
        )
      )
        return false;

      let objComposition = { ...this.composition };

      this.compositionService.saveComposition(objComposition).then((data) => {
        if (objComposition.composition_id) {
          this.compositions[
            this.findIndexById(objComposition.composition_id)
          ] = objComposition;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Atualizado",
            life: 3000,
          });
        } else {
          objComposition = data.return;
          this.compositions.push(objComposition);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Criado",
            life: 3000,
          });
        }
      });

      this.compositionDialog = false;
      this.composition = {};
    },
    editComposition(p_composition) {
      this.composition = { ...p_composition.data };
      this.composition.composition_state =
        this.composition.composition_state == 1 ? true : false;
      this.compositionDialog = true;
    },
    confirmDeleteComposition(composition) {
      this.composition = composition;
      this.deleteCompositionDialog = true;
    },
    deleteComposition() {
      this.compositions = this.compositions.filter(
        (val) => val.composition_id !== this.compositions.composition_id
      );
      this.deleteCompositionDialog = false;
      this.compositions = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteCompositionsDialog = true;
    },
    async deleteSelectedCompositions() {
      let compositionService = new CompositionService();
      let Toast = this.$toast;
      this.selectedCompositions.forEach((objRegistro) => {
        let composition_id = objRegistro.composition_id;
        compositionService
          .deleteSubdivisaoIndice(composition_id)
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
              detail: "Registro COD:" + composition_id + " Deletado!",
              life: 3000,
            });
            this.compositions = this.compositions.filter((val) => {
              return val.composition_id !== composition_id;
            });
          });
      });

      this.deleteCompositionsDialog = false;
      this.selectedCompositions = null;
    },
  },
};
