<template>
  <div class="portifolio_compositions">
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
            :disabled="
              !selectedPortifolioCompositions ||
                !selectedPortifolioCompositions.length
            "
          />
        </template>
      </Toolbar>
      <DataTable
        :value="portifolio_compositions"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['portifolio_id']"
        v-model:filters="filters"
        v-model:selection="selectedPortifolioCompositions"
        selectionMode="checkbox"
        dataKey="portifolio_composition_id"
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
        <Column field="portifolio_composition_id" header="ID"></Column>
        <Column field="portifolio_id" header="Portifolio"></Column>
        <Column field="composition_id" header="Cardápio"></Column>
        <Column field="portifolio_composition_order" header="Ordem"></Column>

        <Column
          headerStyle="width: 8em"
          headerClass="p-text-center"
          bodyClass="p-text-center"
        >
          <template #header></template>
          <template #body="slotProps">
            <Button
              type="button"
              icon="pi pi-search"
              class="p-button-success"
              style="margin-right: .5em"
              @click="openChidrens(slotProps)"
            ></Button>
            <Button
              type="button"
              icon="pi pi-pencil"
              class="p-button-warning"
              @click="editPortifolioComposition(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="portifolio_compositionDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Portifolio"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="portifolio_composition_order">Ordem</label>
        <InputText
          id="portifolio_composition_order"
          type="text"
          v-model="portifolio_composition.portifolio_composition_order"
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
          @click="savePortifolioComposition"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deletePortifolioCompositionDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="portifolio_composition"
          >Você tem certeza que deseja remover
          <b>{{ portifolio_composition.portifolio_composition_id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletePortifolioCompositionDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deletePortifolioCompositionsDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="portifolio_composition"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletePortifolioCompositionsDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedPortifolioCompositions"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./PortifolioCompositions.js"></script>
<style lang="scss">
@import "./PortifolioCompositions.scss";
</style>
