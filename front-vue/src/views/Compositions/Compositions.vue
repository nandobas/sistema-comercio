<template>
  <div class="compositions">
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
            :disabled="!selectedCompositions || !selectedCompositions.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="compositions"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="[
          'composition_id',
          'composition_name',
          'composition_description',
        ]"
        v-model:filters="filters"
        v-model:selection="selectedCompositions"
        selectionMode="checkbox"
        dataKey="composition_id"
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
        <Column field="composition_id" header="ID"></Column>
        <Column field="composition_name" header="Nome"></Column>
        <Column field="composition_description" header="Descrição"></Column>
        <Column field="composition_state" header="Ativo/ inativo">
          <template #body="slotProps">
            <span v-if="slotProps.data.composition_state == 0">Inativo</span>
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
              icon="pi pi-pencil"
              class="p-button-warning"
              @click="editComposition(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="compositionDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Cardápio"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="composition_name">Nome</label>
        <InputText
          id="composition_name"
          type="text"
          v-model="composition.composition_name"
        />
        <label for="composition_description">Descrição</label>
        <Textarea
          id="composition_description"
          v-model="composition.composition_description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
      <div class="p-field">
        <label for="composition_state">Ativo</label>
        <p>
          <InputSwitch
            id="composition_state"
            v-model="composition.composition_state"
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
          @click="saveComposition"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCompositionDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="composition"
          >Você tem certeza que deseja remover
          <b>{{ composition.composition_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteCompositionDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCompositionsDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="composition"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteCompositionsDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedCompositions"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Compositions.js"></script>
<style lang="scss">
@import "./Compositions.scss";
</style>
