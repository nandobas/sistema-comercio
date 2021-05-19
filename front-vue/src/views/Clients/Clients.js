import ClientService from "../../service/ClientService";

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
      clients: null,
      filters: null,
      loading: true,
      clientDialog: false,
      deleteClientDialog: false,
      deleteClientsDialog: false,
      selectedClients: null,

      submitted: false,
      intId: 0,
    };
  },
  ClientService: null,
  created() {
    this.clientService = new ClientService();
    this.initFilters();
  },
  mounted() {
    this.clientService.getClients().then((data) => {
      this.clients = data.docs;
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
      this.clientDialog = true;
    },
    hideDialog() {
      this.clientDialog = false;
      this.submitted = false;
    },

    findIndexById(p_client_id) {
      let index = -1;
      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].client_id === p_client_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveClient() {
      this.submitted = true;

      if (!(this.client.client_name && this.client.client_name.trim()))
        return false;

      let objClient = { ...this.client };

      this.clientService.saveClient(objClient).then((data) => {
        if (objClient.client_id) {
          this.clients[this.findIndexById(objClient.client_id)] = objClient;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Atualizado",
            life: 3000,
          });
        } else {
          objClient = data.return;
          this.clients.push(objClient);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Criado",
            life: 3000,
          });
        }
      });

      this.clientDialog = false;
      this.client = {};
    },
    editClient(p_client) {
      this.client = { ...p_client.data };
      //this.selectedTipo = this.client.id_subdivisao;
      this.clientDialog = true;
    },
    confirmDeleteClient(client) {
      this.client = client;
      this.deleteClientDialog = true;
    },
    deleteClient() {
      this.clients = this.clients.filter(
        (val) => val.client_id !== this.clients.client_id
      );
      this.deleteClientDialog = false;
      this.clients = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteClientsDialog = true;
    },
    async deleteSelectedClients() {
      let clientService = new ClientService();
      let Toast = this.$toast;
      this.selectedClients.forEach((objRegistro) => {
        let client_id = objRegistro.client_id;
        clientService.deleteSubdivisaoIndice(client_id).then((data) => {
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
            detail: "Registro COD:" + client_id + " Deletado!",
            life: 3000,
          });
          this.clients = this.clients.filter((val) => {
            return val.client_id !== client_id;
          });
        });
      });

      this.deleteClientsDialog = false;
      this.selectedClients = null;
    },
  },
};
