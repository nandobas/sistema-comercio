import ArquivoService from "../../service/ArquivoService";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
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
  },

  data() {
    return {
      arquivos: null,
      filters: null,
      loading: true,
      arquivoDialog: false,
      deleteArquivoDialog: false,
      deleteArquivosDialog: false,
      arquivo: {},
      selectedArquivos: null,

      timeoutEdit: "",
      submitted: false,
    };
  },
  arquivoService: null,
  created() {
    this.arquivoService = new ArquivoService();
    this.initFilters();
  },
  mounted() {
    this.arquivoService.getArquivos().then((data) => {
      this.arquivos = data.docs;
      this.loading = false;
    });
  },
  methods: {
    clearFilter() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    openFile(event) {
      this.fileId = event.data.id_arquivo;
      this.$router.push({
        path: "/legislacoes/" + this.fileId + "/" + 0,
      });
    },
    openNew() {
      this.arquivo = {};
      this.submitted = false;
      this.arquivoDialog = true;
    },
    hideDialog() {
      this.arquivoDialog = false;
      this.submitted = false;
    },

    findIndexById(p_id_arquivo) {
      let index = -1;
      for (let i = 0; i < this.arquivos.length; i++) {
        if (this.arquivos[i].p_id_arquivo === p_id_arquivo) {
          index = i;
          break;
        }
      }

      return index;
    },
    onCellEdit(props) {
      clearTimeout(this.timeoutEdit);
      this.timeoutEdit = null;

      this.timeoutEdit = setTimeout(() => {
        this.arquivo = props.data;
        this.timeoutEdit = null;
        this.saveArquivo();
      }, 1000);
    },
    saveArquivo() {
      this.submitted = true;

      if (!(this.arquivo.nome_arquivo && this.arquivo.nome_arquivo.trim()))
        return false;

      let objArquivo = {
        id_arquivo: this.arquivo.id_arquivo ? this.arquivo.id_arquivo : 0,
        nome_arquivo: this.arquivo.nome_arquivo,
      };

      this.arquivoService.saveArquivo(objArquivo).then((data) => {
        if (objArquivo.id_arquivo) {
          this.arquivos[this.findIndexById(objArquivo.id_arquivo)] = objArquivo;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Arquivo Atualizado",
            life: 3000,
          });
        } else {
          objArquivo.id_arquivo = data.id_arquivo;
          this.arquivos.push(objArquivo);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Arquivo Criado",
            life: 3000,
          });
        }
      });

      this.arquivoDialog = false;
      this.arquivo = {};
    },
    editArquivo(arquivo) {
      this.arquivo = { ...arquivo };
      this.arquivoDialog = true;
    },
    confirmDeleteArquivo(arquivo) {
      this.arquivo = arquivo;
      this.deleteArquivoDialog = true;
    },
    deleteArquivo() {
      this.arquivos = this.arquivos.filter(
        (val) => val.id_arquivo !== this.arquivo.id_arquivo
      );
      this.deleteArquivoDialog = false;
      this.arquivo = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Arquivo Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteArquivosDialog = true;
    },
    async deleteSelectedArquivos() {
      let arquivoService = new ArquivoService();

      await this.selectedArquivos.forEach(async function(objArquivo) {
        let id_arquivo = objArquivo.id_arquivo;
        await arquivoService.deleteArquivo(id_arquivo).then((data) => {});
      });

      this.arquivos = this.arquivos.filter(
        (val) => !this.selectedArquivos.includes(val)
      );
      this.deleteArquivosDialog = false;
      this.selectedArquivos = null;
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Arquivo Deletado",
        life: 3000,
      });
    },
  },
};
