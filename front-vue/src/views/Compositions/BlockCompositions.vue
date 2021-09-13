<template>
  <div class="block_compositions">
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Adicionar"
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
            :disabled="
              !selectedBlockCompositions || !selectedBlockCompositions.length
            "
          />
        </template>
      </Toolbar>
      <DataTable
        :value="block_compositions"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="[
          'block.block_name',
          'composition.composition_name',
        ]"
        v-model:filters="filters"
        v-model:selection="selectedBlockCompositions"
        selectionMode="checkbox"
        dataKey="block_composition_id"
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
        <Column header="Cardápio">
          <template #body="slotProps">{{
            slotProps.data.composition.composition_name
          }}</template></Column
        >
        <Column header="Bloco">
          <template #body="slotProps">{{
            slotProps.data.block.block_name
          }}</template></Column
        >
        <Column field="block_composition_order" header="Ordem"></Column>

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
              @click="editBlockComposition(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="block_compositionDialog"
      :style="{ width: '450px' }"
      header="Cardápios do Block"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="block_id"><b>Block</b>:</label>
        <label style="padding-left:3px">
          {{ block_composition.block.block_description }}</label
        >
      </div>
      <div class="p-field">
        <label for="composition_id">Cardápio</label>
        <AutoComplete
          id="composition_id"
          v-model="selectedComposition"
          :suggestions="filteredComposition"
          @complete="searchComposition($event)"
          field="composition_name"
        />
      </div>
      <div class="p-field">
        <label for="block_composition_order">Ordem</label>
        <InputNumber
          id="block_composition_order"
          type="text"
          v-model="block_composition.block_composition_order"
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
          @click="saveBlockComposition"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBlockCompositionDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="block_composition"
          >Você tem certeza que deseja remover
          <b>{{ block_composition.block_composition_id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteBlockCompositionDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBlockCompositionsDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="block_composition"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteBlockCompositionsDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedBlockCompositions"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./BlockCompositions.js"></script>
<style lang="scss">
@import "./BlockCompositions.scss";
</style>
