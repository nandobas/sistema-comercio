import BlockItemService from "../../service/BlockItemService";
import TechnicalFormService from "../../service/TechnicalFormService";
import BlockCompositionService from "../../service/BlockCompositionService";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import AutoComplete from "primevue/autocomplete";
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
    AutoComplete,
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
      block_items: null,
      block_item: {},
      filters: null,
      loading: true,
      block_itemDialog: false,
      deleteBlockItemDialog: false,
      deleteBlockItemsDialog: false,
      selectedBlockItems: null,

      selectedTechnicalForm: null,
      filteredTechnicalForm: [],

      submitted: false,
      intId: 0,
      blockCompositionId: 0,
    };
  },
  block_itemService: null,
  block_composition_service: null,
  technical_form_service: null,
  created() {
    this.block_itemService = new BlockItemService();
    this.technical_form_service = new TechnicalFormService();
    this.block_composition_service = new BlockCompositionService();
    this.initFilters();
  },
  mounted() {
    if (this.$route.params.intId) this.intId = this.$route.params.intId;
    if (this.$route.params.blockCompositionId)
      this.blockCompositionId = this.$route.params.blockCompositionId;
    this.block_itemService
      .getBlockItems(this.blockCompositionId)
      .then((data) => {
        this.block_items = data.docs;
        this.loading = false;
      });
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

    async openNew() {
      this.submitted = false;
      let search_item = await this.block_composition_service.getBlockComposition(
        this.blockCompositionId
      );
      this.block_item.block_composition = search_item.docs[0];
      this.block_itemDialog = true;
    },
    hideDialog() {
      this.block_itemDialog = false;
      this.submitted = false;
    },

    async searchBlock(event) {
      this.filteredTechnicalForm = await this.technical_form_service.searchTechnicalForms(
        event.query
      );
    },

    findIndexById(p_block_item_id) {
      let index = -1;
      for (let i = 0; i < this.block_items.length; i++) {
        if (this.block_items[i].block_item_id === p_block_item_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveBlockItem() {
      this.submitted = true;

      let objBlockItem = { ...this.block_item };
      objBlockItem.technical_form_id = this.selectedTechnicalForm.technical_form_id;
      objBlockItem.block_composition_id = this.block_item.block_composition.block_composition_id;

      let atualiza_dados = objBlockItem.block_item_id ? true : false;

      this.block_itemService.saveBlockItem(objBlockItem).then(async (data) => {
        console.log(data);

        if (data.status == true) {
          if (atualiza_dados) {
            this.block_items[this.findIndexById(objBlockItem.block_item_id)] =
              data.return;
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Atualizado",
              life: 3000,
            });
          } else {
            objBlockItem = data.return;
            this.block_items.push(objBlockItem);
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Registro Adicionado",
              life: 3000,
            });
          }
          this.block_itemDialog = false;
          this.block_item = {};
        } else {
          let message = "Erro ao salvar";
          if (data.message && data.message == "JA_INCLUSO")
            message =
              "Ficha " +
              this.selectedTechnicalForm.technical_form_name +
              " já incluso na lista";
          this.$toast.add({
            severity: "error",
            summary: "Erro",
            detail: message,
            life: 4000,
          });
        }
      });
    },
    editBlockItem(p_block_item) {
      this.block_item = { ...p_block_item.data };
      this.selectedTechnicalForm = this.block_item.technical_form;
      this.block_itemDialog = true;
    },
    confirmDeleteBlockItem(block_item) {
      this.block_item = block_item;
      this.deleteBlockItemDialog = true;
    },
    deleteBlockItem() {
      this.block_items = this.block_items.filter(
        (val) => val.block_item_id !== this.block_items.block_item_id
      );
      this.deleteBlockItemDialog = false;
      this.block_items = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteBlockItemsDialog = true;
    },
    async deleteSelectedBlockItems() {
      let block_itemService = new BlockItemService();
      let Toast = this.$toast;
      this.selectedBlockItems.forEach((objRegistro) => {
        let block_item_id = objRegistro.block_item_id;
        block_itemService.deleteBlockItem(block_item_id).then((data) => {
          if (!data.status) {
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
            detail: "Registro COD:" + block_item_id + " Deletado!",
            life: 3000,
          });
          this.block_items = this.block_items.filter((val) => {
            return val.block_item_id !== block_item_id;
          });
        });
      });

      this.deleteBlockItemsDialog = false;
      this.selectedBlockItems = null;
    },
  },
};
