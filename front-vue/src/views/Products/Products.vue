<template>
  <div class="products">
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Novo"
            icon="pi pi-plus"
            class="p-button-success p-mr-2"
            @click="openNew"
          />
          <Button
            label="Remover"
            icon="pi pi-trash"
            style="margin-left:3px;"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="products"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['product_id', 'product_name']"
        v-model:filters="filters"
        v-model:selection="selectedProducts"
        selectionMode="checkbox"
        dataKey="product_id"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
        filterDisplay="menu"
        responsiveLayout="scroll"
        ><template #header>
          <div class="p-d-flex p-jc-between">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Limpar"
              class="p-button-outlined"
              @click="clearFilter()"
            />
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Pesquisar"
              />
            </span>
          </div>
        </template>
        <template #empty>
          Não foram encontrados registros.
        </template>
        <template #loading>
          Carregando registros. Aguarde...
        </template>
        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>
        <Column field="product_id" header="ID"></Column>
        <Column field="product_name" header="Nome"></Column>
        <Column field="product_description" header="Descrição"></Column>

        <Column
          headerStyle="width: 8em"
          headerClass="p-text-center"
          bodyClass="p-text-center"
        >
          <template #header></template>
          <template #body="slotProps">
            <Button
              type="button"
              icon="pi pi-pencil"
              class="p-button-warning"
              @click="editProduct(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Produto"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="provider_id">Fornecedor</label>
        <Dropdown
          v-model="selectedProvider"
          :options="providers.filter((val) => val.provider_id != -1)"
          optionLabel="provider_name"
          optionValue="provider_id"
          placeholder="Selecione o fornecedor"
        />
      </div>
      <div class="p-field">
        <label for="product_name">Nome</label>
        <InputText
          id="product_name"
          type="text"
          v-model="product.product_name"
        />
      </div>
      <div class="p-field">
        <label for="product_description">Descrição</label>
        <Textarea
          id="product_description"
          v-model="product.product_description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Salvar"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Você tem certeza que deseja remover <b>{{ product.product_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductsDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedProducts"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Products.js"></script>
<style lang="scss">
@import "./Products.scss";
</style>
