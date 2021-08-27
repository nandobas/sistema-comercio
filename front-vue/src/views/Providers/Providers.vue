<template>
  <div class="providers">
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
            :disabled="!selectedProviders || !selectedProviders.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="providers"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['provider_id', 'provider_name']"
        v-model:filters="filters"
        v-model:selection="selectedProviders"
        selectionMode="checkbox"
        dataKey="provider_id"
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
        <Column field="provider_id" header="ID"></Column>
        <Column field="provider_name" header="Nome"></Column>
        <Column field="provider_contacts" header="Contatos"></Column>

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
              @click="editProvider(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="providerDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Fornecedor"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="provider_name">Nome</label>
        <InputText
          id="provider_name"
          type="text"
          v-model="provider.provider_name"
        />
      </div>
      <div class="p-field">
        <label for="provider_contacts">Contatos</label>
        <Textarea
          id="provider_contacts"
          v-model="provider.provider_contacts"
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
          @click="saveProvider"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProviderDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="provider"
          >Você tem certeza que deseja remover
          <b>{{ provider.provider_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProviderDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProvidersDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="provider"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProvidersDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedProviders"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Providers.js"></script>
<style lang="scss">
@import "./Providers.scss";
</style>
