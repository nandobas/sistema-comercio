<template>
  <div class="block_items">
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Adicionar Ficha Técnica"
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
            :disabled="!selectedBlockItems || !selectedBlockItems.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="block_items"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['technical_form.technical_form_name']"
        v-model:filters="filters"
        v-model:selection="selectedBlockItems"
        selectionMode="checkbox"
        dataKey="block_item_id"
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
        <Column header="Ficha Técnica">
          <template #body="slotProps">{{
            slotProps.data.technical_form.technical_form_name
          }}</template></Column
        >

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
              @click="editBlockItem(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="block_itemDialog"
      :style="{ width: '450px' }"
      header="Item do Bloco"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="block_composition_id"><b>Bloco</b>:</label>
        <label style="padding-left:3px">
          {{ block_item.block_composition.block.block_name }}</label
        >
      </div>
      <div class="p-field">
        <label for="technical_form_id"><b>Ficha Técnica</b>:</label>
        <AutoComplete
          id="technical_form_id"
          v-model="selectedTechnicalForm"
          :suggestions="filteredTechnicalForm"
          @complete="searchBlock($event)"
          field="technical_form_name"
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
          @click="saveBlockItem"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBlockItemDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="block_item"
          >Você tem certeza que deseja remover
          <b>{{ block_item.block_item_id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteBlockItemDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBlockItemsDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="block_item"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteBlockItemsDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedBlockItems"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./BlockItems.js"></script>
<style lang="scss">
@import "./BlockItems.scss";
</style>
