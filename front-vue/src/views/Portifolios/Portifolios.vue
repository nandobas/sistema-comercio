<template>
  <div class="portifolios">
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
            :disabled="!selectedPortifolios || !selectedPortifolios.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="portifolios"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['portifolio_id', 'portifolio_description']"
        v-model:filters="filters"
        v-model:selection="selectedPortifolios"
        selectionMode="checkbox"
        dataKey="portifolio_id"
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
        <Column field="portifolio_id" header="ID"></Column>
        <Column field="portifolio_description" header="Descrição"></Column>
        <Column field="portifolio_state" header="Ativo/ inativo">
          <template #body="slotProps">
            <span v-if="slotProps.data.portifolio_state == 0">Inativo</span>
            <span v-else>Ativo</span></template
          ></Column
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
              icon="pi pi-search"
              class="p-button-success"
              style="margin-right: .5em"
              @click="openChidrens(slotProps)"
            ></Button>
            <Button
              type="button"
              icon="pi pi-pencil"
              class="p-button-warning"
              @click="editPortifolio(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="portifolioDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Portifolio"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="portifolio_description">Descrição</label>
        <InputText
          id="portifolio_description"
          type="text"
          v-model="portifolio.portifolio_description"
        />
      </div>
      <div class="p-field">
        <label for="portifolio_state">Ativo</label>
        <p>
          <InputSwitch
            id="portifolio_state"
            v-model="portifolio.portifolio_state"
          />
        </p>
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
          @click="savePortifolio"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deletePortifolioDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="portifolio"
          >Você tem certeza que deseja remover
          <b>{{ portifolio.portifolio_description }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletePortifolioDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deletePortifoliosDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="portifolio"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletePortifoliosDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedPortifolios"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Portifolios.js"></script>
<style lang="scss">
@import "./Portifolios.scss";
</style>
