<template>
  <div>
    <TreeTable :value="nodes" selectionMode="single" @nodeSelect="onNodeSelect">
      <template #header>
        Arquivos
      </template>
      <Column field="titulo" header="Titulo" :expander="true"
        ><template #body="slotProps">
          {{
            slotProps.node.data.titulo == "arquivo"
              ? slotProps.node.data.nome_arquivo
              : slotProps.node.data.titulo
          }}
        </template></Column
      >
      <Column field="nome_arquivo" header="Arquivo"></Column>
      <Column field="custom" header="Texto"></Column>

      <Column
        headerStyle="width: 8em"
        headerClass="p-text-center"
        bodyClass="p-text-center"
        field="nome_arquivo"
      >
        <template #header></template>
        <template #body="slotProps">
          <Button
            type="button"
            icon="pi pi-plus"
            class="p-button-success"
            style="margin-right: .5em"
          ></Button>
          <Button
            v-if="slotProps.node.data.titulo !== 'arquivo'"
            type="button"
            icon="pi pi-pencil"
            class="p-button-warning"
            @click="openMaximizable(slotProps.node.data)"
          ></Button>
        </template>
      </Column>
      <template #footer>
        <div style="text-align:left">
          <Button icon="pi pi-refresh" />
        </div>
      </template>
    </TreeTable>

    <Dialog
      :header="this.objEdit.titulo"
      v-model:visible="displayMaximizable"
      :style="{ width: '50vw' }"
      :maximizable="true"
      :modal="true"
    >
      <p class="p-m-0">
        {{ this.objEdit.custom }}
      </p>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="closeMaximizable"
          class="p-button-text"
        />
        <Button
          label="Salvar"
          icon="pi pi-check"
          @click="closeMaximizable"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import NodeService from "../../service/NodeService";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";

export default {
  components: { TreeTable, Column, Dialog },

  data() {
    return {
      selectedKey1: null,
      selectedKey2: null,
      selectedKeys1: null,
      selectedKeys2: null,
      selectedKeys3: null,
      displayMaximizable: false,
      objEdit: { titulo: "-", custom: "" },
      nodes: null,
    };
  },
  nodeService: null,
  created() {
    this.nodeService = new NodeService();
  },
  mounted() {
    this.nodeService.getTreeTableNodes().then((data) => (this.nodes = data));
  },
  methods: {
    openMaximizable(p_obj) {
      this.objEdit = p_obj;
      this.displayMaximizable = true;
    },
    closeMaximizable() {
      this.displayTxt = "";
      this.displayMaximizable = false;
    },
  },
};
</script>
