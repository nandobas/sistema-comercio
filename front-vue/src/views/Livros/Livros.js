import LivroService from "../../service/LivroService";
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
      livros: null,
      livro: {},
      filters: null,
      loading: true,
      livroDialog: false,
      deleteLivroDialog: false,
      deleteLivrosDialog: false,
      selectedLivros: null,

      timeoutEdit: "",
      submitted: false,
    };
  },
  livroService: null,
  created() {
    this.livroService = new LivroService();
    this.initFilters();
  },
  mounted() {
    this.livroService.getLivros().then((data) => {
      this.livros = data.docs;
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
      this.fileId = event.data.id_livro;
      this.$router.push({
        path: "/indices/" + this.fileId + "/" + 0,
      });
    },
    openNew() {
      this.livro = {};
      this.submitted = false;
      this.livroDialog = true;
    },
    hideDialog() {
      this.livroDialog = false;
      this.submitted = false;
    },

    findIndexById(p_id_livro) {
      let index = -1;
      for (let i = 0; i < this.livros.length; i++) {
        if (this.livros[i].p_id_livro === p_id_livro) {
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
        this.livro = props.data;
        this.timeoutEdit = null;
        this.saveLivro();
      }, 1000);
    },
    saveLivro() {
      this.submitted = true;

      if (!(this.livro.nome_livro && this.livro.nome_livro.trim()))
        return false;

      let objLivro = {
        id_livro: this.livro.id_livro ? this.livro.id_livro : 0,
        nome_livro: this.livro.nome_livro,
      };

      this.livroService.saveLivro(objLivro).then((data) => {
        if (objLivro.id_livro) {
          this.livros[this.findIndexById(objLivro.id_livro)] = objLivro;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Livro Atualizado",
            life: 3000,
          });
        } else {
          objLivro.id_livro = data.id_livro;
          this.livros.push(objLivro);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Livro Criado",
            life: 3000,
          });
        }
      });

      this.livroDialog = false;
      this.livro = {};
    },
    editLivro(livro) {
      this.livro = { ...livro };
      this.livroDialog = true;
    },
    confirmDeleteLivro(livro) {
      this.livro = livro;
      this.deleteLivroDialog = true;
    },
    deleteLivro() {
      this.livros = this.livros.filter(
        (val) => val.id_livro !== this.livro.id_livro
      );
      this.deleteLivroDialog = false;
      this.livro = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Livro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteLivrosDialog = true;
    },
    async deleteSelectedLivros() {
      let livroService = new LivroService();

      await this.selectedLivros.forEach(async function(objLivro) {
        let id_livro = objLivro.id_livro;
        await livroService.deleteLivro(id_livro).then((data) => {});
      });

      this.livros = this.livros.filter(
        (val) => !this.selectedLivros.includes(val)
      );
      this.deleteLivrosDialog = false;
      this.selectedLivros = null;
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Livro Deletado",
        life: 3000,
      });
    },
    abrirIndice(p_id_livro) {
      let routeData = this.$router.resolve({ path: "/livro/" + p_id_livro });
      window.open(routeData.href, "_blank");
    },
  },
};
