import TechnicalFormService from "../../service/TechnicalFormService";
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
      technical_forms: null,
      technical_form: {},
      filters: null,
      loading: true,
      technical_formDialog: false,
      deleteTechnicalFormDialog: false,
      deleteTechnicalFormsDialog: false,
      selectedTechnicalForms: null,

      submitted: false,
      intId: 0,
    };
  },
  TechnicalFormService: null,
  created() {
    this.technical_formService = new TechnicalFormService();
    this.initFilters();
  },
  mounted() {
    this.technical_formService.getTechnicalForms().then((data) => {
      this.technical_forms = data.docs;
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
      this.technical_formDialog = true;
    },
    hideDialog() {
      this.technical_formDialog = false;
      this.submitted = false;
    },

    findIndexById(p_technical_form_id) {
      let index = -1;
      for (let i = 0; i < this.technical_forms.length; i++) {
        if (this.technical_forms[i].technical_form_id === p_technical_form_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveTechnicalForm() {
      this.submitted = true;

      if (
        !(
          this.technical_form.technical_form_name &&
          this.technical_form.technical_form_name.trim()
        )
      )
        return false;

      let objTechnicalForm = { ...this.technical_form };

      this.technical_formService
        .saveTechnicalForm(objTechnicalForm)
        .then((data) => {
          if (objTechnicalForm.technical_form_id) {
            this.technical_forms[
              this.findIndexById(objTechnicalForm.technical_form_id)
            ] = objTechnicalForm;
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Atualizado",
              life: 3000,
            });
          } else {
            objTechnicalForm = data.return;
            this.technical_forms.push(objTechnicalForm);
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Criado",
              life: 3000,
            });
          }
        });

      this.technical_formDialog = false;
      this.technical_form = {};
    },
    editTechnicalForm(p_technical_form) {
      this.technical_form = { ...p_technical_form.data };
      this.technical_formDialog = true;
    },
    confirmDeleteTechnicalForm(technical_form) {
      this.technical_form = technical_form;
      this.deleteTechnicalFormDialog = true;
    },
    deleteTechnicalForm() {
      this.technical_forms = this.technical_forms.filter(
        (val) =>
          val.technical_form_id !== this.technical_forms.technical_form_id
      );
      this.deleteTechnicalFormDialog = false;
      this.technical_forms = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteTechnicalFormsDialog = true;
    },
    async deleteSelectedTechnicalForms() {
      let technical_formService = new TechnicalFormService();
      let Toast = this.$toast;
      this.selectedTechnicalForms.forEach((objRegistro) => {
        let technical_form_id = objRegistro.technical_form_id;
        technical_formService
          .deleteSubdivisaoIndice(technical_form_id)
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
              detail: "Registro COD:" + technical_form_id + " Deletado!",
              life: 3000,
            });
            this.technical_forms = this.technical_forms.filter((val) => {
              return val.technical_form_id !== technical_form_id;
            });
          });
      });

      this.deleteTechnicalFormsDialog = false;
      this.selectedTechnicalForms = null;
    },
  },
};
