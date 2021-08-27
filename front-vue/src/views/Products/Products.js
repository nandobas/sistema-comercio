import ProductService from "../../service/ProductService";
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
      products: null,
      product: {},
      filters: null,
      loading: true,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      selectedProducts: null,

      providers: null,
      selectedProvider: null,
      submitted: false,
      intId: 0,
    };
  },
  ProductService: null,
  ProviderService: null,
  created() {
    this.productService = new ProductService();
    this.ProviderService = new ProviderService();
    this.initFilters();
  },
  mounted() {
    this.ProviderService.getProviders().then((registros) => {
      this.providers = registros.docs;
      console.log(this.providers);
    });
    this.productService.getProducts().then((data) => {
      this.products = data.docs;
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
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },

    findIndexById(p_product_id) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].product_id === p_product_id) {
          index = i;
          break;
        }
      }

      return index;
    },
    saveProduct() {
      this.submitted = true;

      if (!(this.product.product_name && this.product.product_name.trim()))
        return false;

      let objProduct = { ...this.product };
      objProduct.provider_id = this.selectedProvider;

      this.productService.saveProduct(objProduct).then((data) => {
        if (objProduct.product_id) {
          this.products[this.findIndexById(objProduct.product_id)] = objProduct;
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Atualizado",
            life: 3000,
          });
        } else {
          objProduct = data.return;
          this.products.push(objProduct);
          this.$toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Registro Criado",
            life: 3000,
          });
        }
      });

      this.productDialog = false;
      this.product = {};
    },
    editProduct(p_product) {
      this.product = { ...p_product.data };
      this.selectedProvider = this.product.provider_id;
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.products = this.products.filter(
        (val) => val.product_id !== this.products.product_id
      );
      this.deleteProductDialog = false;
      this.products = {};
      this.$toast.add({
        severity: "success",
        summary: "Feito!",
        detail: "Registro Deletado",
        life: 3000,
      });
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    async deleteSelectedProducts() {
      let productService = new ProductService();
      let Toast = this.$toast;
      this.selectedProducts.forEach((objRegistro) => {
        let product_id = objRegistro.product_id;
        productService.deleteSubdivisaoIndice(product_id).then((data) => {
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
            detail: "Registro COD:" + product_id + " Deletado!",
            life: 3000,
          });
          this.products = this.products.filter((val) => {
            return val.product_id !== product_id;
          });
        });
      });

      this.deleteProductsDialog = false;
      this.selectedProducts = null;
    },
  },
};
