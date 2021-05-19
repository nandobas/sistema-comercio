<template>
  <div class="indices">
    <Panel :header="getSubdivisaoIndiceSelecionada().titulo">
      {{
        this.parentId == 0
          ? this.livro.nome_livro
          : getSubdivisaoIndiceSelecionada().custom
      }}
      <Breadcrumb
        :home="{
          icon: 'pi pi-home',
          url: app_home + '/indices/' + fileId + '/0',
          label: this.livro.nome_livro ? ' ' + this.livro.nome_livro : '',
        }"
        :model="arr_indice_parents"
      />
    </Panel>
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
            :disabled="!selectedIndices || !selectedIndices.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="indices"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['id_subdivisao_indice', 'descricao']"
        v-model:filters="filters"
        v-model:selection="selectedIndices"
        selectionMode="checkbox"
        dataKey="id_subdivisao_indice"
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
        <Column field="id_indice" header="ID"></Column>
        <Column field="id_subdivisao" header="Tipo">
          <template #body="slotProps">
            {{ getTituloSubdivisao(slotProps.data.id_subdivisao) }}
          </template>
        </Column>
        <Column field="indice.descricao" header="Descrição"></Column>

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
              @click="editIndice(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="indiceDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Indice"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="id_subdivisao">Subdivisão do registro</label>
        <Dropdown
          v-model="selectedTipo"
          :options="subdivisoes_indice.filter((val) => val.id_subdivisao != 1)"
          optionLabel="titulo"
          optionValue="id_subdivisao"
          placeholder="Selecione o tipo de subdivisão"
        />
      </div>
      <div class="p-field">
        <label for="descricao">Descrição</label>
        <Textarea
          id="descricao"
          v-model="subdivisao_indice.indice.descricao"
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
          @click="saveIndice"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteIndiceDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="subdivisao_indice"
          >Você tem certeza que deseja remover
          <b>{{ subdivisao_indice.id_subdivisao_indice }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteIndiceDialog = false"
        />
        <Button label="Sim" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteIndicesDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="subdivisao_indice"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteIndicesDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedIndices"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Indices.js"></script>
<style lang="scss">
@import "./indices.scss";
</style>
