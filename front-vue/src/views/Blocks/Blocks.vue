<template>
  <div class="blocks">
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
            :disabled="!selectedBlocks || !selectedBlocks.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="blocks"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['block_id', 'block_name']"
        v-model:filters="filters"
        v-model:selection="selectedBlocks"
        selectionMode="checkbox"
        dataKey="block_id"
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
        <Column field="block_id" header="ID"></Column>
        <Column field="block_name" header="Nome"></Column>

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
              @click="editBlock(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="blockDialog"
      :style="{ width: '450px' }"
      header="Detalhes da Categoria"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="block_name">Nome</label>
        <InputText id="block_name" type="text" v-model="block.block_name" />
        <!-- <label for="block_description">Descrição</label>
        <Textarea
          id="block_description"
          v-model="block.block_description"
          required="true"
          rows="3"
          cols="20"
        /> -->
      </div>
      <div class="p-field">
        <label for="block_state">Ativo</label>
        <p>
          <InputSwitch id="block_state" v-model="block.block_state" />
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
          @click="saveBlock"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBlockDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="block"
          >Você tem certeza que deseja remover <b>{{ block.block_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteBlockDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBlocksDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="block">Você tem certeza que deseja remover a seleção?</span>
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteBlocksDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedBlocks"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Blocks.js"></script>
<style lang="scss">
@import "./Blocks.scss";
</style>
