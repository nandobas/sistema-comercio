import BlockCompositionService from "../../service/BlockCompositionService";
import BlockService from "../../service/BlockService";
import CompositionService from "../../service/CompositionService";

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
      block_compositions: null,
      block_composition: {},
      filters: null,
      loading: true,
      block_compositionDialog: false,
      deleteBlockCompositionDialog: false,
      deleteBlockCompositionsDialog: false,
      selectedBlockCompositions: null,

      selectedBlock: null,

      selectedBlock: null,
      filteredBlock: [],

      submitted: false,
      intId: 0,
      compositionId: 0,
    };
  },
  block_compositionService: null,
  composition_service: null,
  block_service: null,
  created() {
    this.block_compositionService = new BlockCompositionService();
    this.block_service = new BlockService();
    this.composition_service = new CompositionService();
    this.initFilters();
  },
  mounted() {
    if (this.$route.params.intId) this.intId = this.$route.params.intId;
    if (this.$route.params.compositionId)
      this.compositionId = this.$route.params.compositionId;

    this.block_compositionService
      .getBlockCompositions(this.compositionId)
      .then((data) => {
        this.block_compositions = data.docs;
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

    openChidrens(p_objBlockComposition) {
      let block_composition_id =
        p_objBlockComposition.data.block_composition_id;
      this.$router.push({
        path: "/block_item/" + block_composition_id,
      });
    },

    async openNew() {
      this.submitted = false;

      this.block_composition.composition = await this.composition_service.getComposition(
        this.compositionId
      );
      this.block_compositionDialog = true;
    },
    hideDialog() {
      this.block_compositionDialog = false;
      this.submitted = false;
    },

    async searchBlock(event) {
      this.filteredBlock = await this.block_service.searchBlocks(event.query);
    },

    findIndexById(p_block_composition_id) {
      let index = -1;
      for (let i = 0; i < this.block_compositions.length; i++) {
        if (
          this.block_compositions[i].block_composition_id ===
          p_block_composition_id
        ) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveBlockComposition() {
      this.submitted = true;

      let objBlockComposition = { ...this.block_composition };
      objBlockComposition.block_id = this.selectedBlock.block_id;
      objBlockComposition.composition_id = this.block_composition.composition.composition_id;
      delete objBlockComposition.composition;

      let atualiza_dados = objBlockComposition.block_composition_id
        ? true
        : false;

      this.block_compositionService
        .saveBlockComposition(objBlockComposition)
        .then(async (data) => {
          console.log(data);

          if (data.status == true) {
            if (atualiza_dados) {
              this.block_compositions[
                this.findIndexById(objBlockComposition.block_composition_id)
              ] = data.return;
              this.$toast.add({
                severity: "success",
                summary: "Sucesso",
                detail: "Registro Atualizado",
                life: 3000,
              });
            } else {
              objBlockComposition = data.return;
              this.block_compositions.push(objBlockComposition);
              this.$toast.add({
                severity: "success",
                summary: "Sucesso",
                detail: "Registro Adicionado",
                life: 3000,
              });
            }
            this.block_compositionDialog = false;
            this.block_composition = {};
          } else {
            let message = "Erro ao salvar";
            if (data.message && data.message == "JA_INCLUSO")
              message =
                "Bloco " +
                this.selectedBlock.block_name +
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
    editBlockComposition(p_block_composition) {
      this.block_composition = { ...p_block_composition.data };
      this.selectedBlock = this.block_composition.block;
      this.block_compositionDialog = true;
    },
    confirmDeleteBlockComposition(block_composition) {
      this.block_composition = block_composition;
      this.deleteBlockCompositionDialog = true;
    },
    deleteBlockComposition() {
      this.block_compositions = this.block_compositions.filter(
        (val) =>
          val.block_composition_id !==
          this.block_compositions.block_composition_id
      );
      this.deleteBlockCompositionDialog = false;
      this.block_compositions = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteBlockCompositionsDialog = true;
    },
    async deleteSelectedBlockCompositions() {
      let block_compositionService = new BlockCompositionService();
      let Toast = this.$toast;
      this.selectedBlockCompositions.forEach((objRegistro) => {
        let block_composition_id = objRegistro.block_composition_id;
        block_compositionService
          .deleteBlockComposition(block_composition_id)
          .then((data) => {
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
              detail: "Registro COD:" + block_composition_id + " Deletado!",
              life: 3000,
            });
            this.block_compositions = this.block_compositions.filter((val) => {
              return val.block_composition_id !== block_composition_id;
            });
          });
      });

      this.deleteBlockCompositionsDialog = false;
      this.selectedBlockCompositions = null;
    },
  },
};
