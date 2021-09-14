<template>
  <div class="technical_forms">
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Nova Ficha"
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
              !selectedTechnicalForms || !selectedTechnicalForms.length
            "
          />
        </template>
      </Toolbar>
      <DataTable
        :value="technical_forms"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['technical_form_id', 'technical_form_name']"
        v-model:filters="filters"
        v-model:selection="selectedTechnicalForms"
        selectionMode="checkbox"
        dataKey="technical_form_id"
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
        <Column field="technical_form_id" header="ID"></Column>
        <Column field="technical_form_name" header="Nome"></Column>

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
              @click="editTechnicalForm(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="technical_formDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Cardápio"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="technical_form_name">Nome</label>
        <InputText
          id="technical_form_name"
          type="text"
          v-model="technical_form.technical_form_name"
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
          @click="saveTechnicalForm"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteTechnicalFormDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="technical_form"
          >Você tem certeza que deseja remover
          <b>{{ technical_form.technical_form_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteTechnicalFormDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteTechnicalFormsDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="technical_form"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteTechnicalFormsDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedTechnicalForms"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./TechnicalForms.js"></script>
<style lang="scss">
@import "./TechnicalForms.scss";
</style>
