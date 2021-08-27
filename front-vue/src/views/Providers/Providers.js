import ProviderService from "../../service/ProviderService";

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
      providers: null,
      provider: {},
      filters: null,
      loading: true,
      providerDialog: false,
      deleteProviderDialog: false,
      deleteProvidersDialog: false,
      selectedProviders: null,

      submitted: false,
      intId: 0,
    };
  },
  ProviderService: null,
  created() {
    this.providerService = new ProviderService();
    this.initFilters();
  },
  mounted() {
    this.providerService.getProviders().then((data) => {
      this.providers = data.docs;
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
      this.providerDialog = true;
    },
    hideDialog() {
      this.providerDialog = false;
      this.submitted = false;
    },

    findIndexById(p_provider_id) {
      let index = -1;
      for (let i = 0; i < this.providers.length; i++) {
        if (this.providers[i].provider_id === p_provider_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveProvider() {
      this.submitted = true;

      if (!(this.provider.provider_name && this.provider.provider_name.trim()))
        return false;

      let objProvider = { ...this.provider };

      this.providerService.saveProvider(objProvider).then((data) => {
        if (objProvider.provider_id) {
          this.providers[
            this.findIndexById(objProvider.provider_id)
          ] = objProvider;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Atualizado",
            life: 3000,
          });
        } else {
          objProvider = data.return;
          this.providers.push(objProvider);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Criado",
            life: 3000,
          });
        }
      });

      this.providerDialog = false;
      this.provider = {};
    },
    editProvider(p_provider) {
      this.provider = { ...p_provider.data };
      //this.selectedTipo = this.provider.id_subdivisao;
      this.providerDialog = true;
    },
    confirmDeleteProvider(provider) {
      this.provider = provider;
      this.deleteProviderDialog = true;
    },
    deleteProvider() {
      this.providers = this.providers.filter(
        (val) => val.provider_id !== this.providers.provider_id
      );
      this.deleteProviderDialog = false;
      this.providers = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteProvidersDialog = true;
    },
    async deleteSelectedProviders() {
      let providerService = new ProviderService();
      let Toast = this.$toast;
      this.selectedProviders.forEach((objRegistro) => {
        let provider_id = objRegistro.provider_id;
        providerService.deleteSubdivisaoIndice(provider_id).then((data) => {
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
            detail: "Registro COD:" + provider_id + " Deletado!",
            life: 3000,
          });
          this.providers = this.providers.filter((val) => {
            return val.provider_id !== provider_id;
          });
        });
      });

      this.deleteProvidersDialog = false;
      this.selectedProviders = null;
    },
  },
};
