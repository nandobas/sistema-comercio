import BlockService from "../../service/BlockService";
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
      blocks: null,
      block: {},
      filters: null,
      loading: true,
      blockDialog: false,
      deleteBlockDialog: false,
      deleteBlocksDialog: false,
      selectedBlocks: null,

      submitted: false,
      intId: 0,
    };
  },
  BlockService: null,
  created() {
    this.blockService = new BlockService();
    this.initFilters();
  },
  mounted() {
    this.blockService.getBlocks().then((data) => {
      this.blocks = data.docs;
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
      this.block = {};
      this.submitted = false;
      this.blockDialog = true;
    },
    hideDialog() {
      this.blockDialog = false;
      this.submitted = false;
    },

    findIndexById(p_block_id) {
      let index = -1;
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].block_id === p_block_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveBlock() {
      this.submitted = true;

      /*if (
        !(this.block.block_description && this.block.block_description.trim())
      )
        return false;*/

      if (!(this.block.block_name && this.block.block_name.trim()))
        return false;

      let objBlock = { ...this.block };

      this.blockService.saveBlock(objBlock).then((data) => {
        if (objBlock.block_id) {
          this.blocks[this.findIndexById(objBlock.block_id)] = objBlock;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Atualizado",
            life: 3000,
          });
        } else {
          objBlock = data.return;
          this.blocks.push(objBlock);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Criado",
            life: 3000,
          });
        }
      });

      this.blockDialog = false;
      this.block = {};
    },
    editBlock(p_block) {
      this.block = { ...p_block.data };
      this.block.block_state = this.block.block_state == 1 ? true : false;
      this.blockDialog = true;
    },
    confirmDeleteBlock(block) {
      this.block = block;
      this.deleteBlockDialog = true;
    },
    deleteBlock() {
      this.blocks = this.blocks.filter(
        (val) => val.block_id !== this.blocks.block_id
      );
      this.deleteBlockDialog = false;
      this.blocks = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteBlocksDialog = true;
    },
    async deleteSelectedBlocks() {
      let blockService = new BlockService();
      let Toast = this.$toast;
      this.selectedBlocks.forEach((objRegistro) => {
        let block_id = objRegistro.block_id;
        blockService.deleteSubdivisaoIndice(block_id).then((data) => {
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
            detail: "Registro COD:" + block_id + " Deletado!",
            life: 3000,
          });
          this.blocks = this.blocks.filter((val) => {
            return val.block_id !== block_id;
          });
        });
      });

      this.deleteBlocksDialog = false;
      this.selectedBlocks = null;
    },
  },
};
