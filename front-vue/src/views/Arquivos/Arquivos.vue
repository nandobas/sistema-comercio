<template>
  <div class="arquivos">
    <div class="card">
      <Toolbar class="p-mb-6">
        <template #left>
          <div class="p-mb-6">
            <Button
              label="Novo"
              icon="pi pi-plus"
              class="p-button-success"
              @click="openNew"
            />
            <Button
              label="Remover"
              icon="pi pi-trash"
              style="margin-left:3px;"
              class="p-button-danger"
              @click="confirmDeleteSelected"
              :disabled="!selectedArquivos || !selectedArquivos.length"
            />
          </div>
        </template>
      </Toolbar>
      <DataTable
        :value="arquivos"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :globalFilterFields="['nome_arquivo', 'id_arquivo']"
        :loading="loading"
        v-model:selection="selectedArquivos"
        v-model:filters="filters"
        filterDisplay="menu"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
        responsiveLayout="scroll"
        editMode="cell"
        dataKey="id_arquivo"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
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
          Carregando registros. Please wait.
        </template>
        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>
        <Column field="id_arquivo" header="ID" style="width:25%"></Column>
        <Column field="nome_arquivo" header="Nome">
          <template #editor="slotProps">
            <InputText
              v-model="slotProps.data[slotProps.column.props.field]"
              @update:modelValue="onCellEdit(slotProps)"
            /> </template
        ></Column>

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
              @click="openFile(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="arquivoDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Arquivo"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="name">Nome</label>
        <InputText
          id="nome_arquivo"
          v-model.trim="arquivo.nome_arquivo"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !arquivo.nome_arquivo }"
        />
        <small class="p-error" v-if="submitted && !arquivo.nome_arquivo"
          >Nome é obrigatório.</small
        >
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
          @click="saveArquivo"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteArquivoDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="arquivo"
          >Você tem certeza que deseja remover <b>{{ arquivo.nome_arquivo }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteArquivoDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="arquivoProduct"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteArquivosDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="arquivo"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteArquivosDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedArquivos"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Arquivos.js"></script>
<style lang="scss">
@import "./Arquivos.scss";
</style>
