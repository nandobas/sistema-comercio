<template>
  <div class="legislacoes">
    <Panel :header="getFormaLegislacaoSelecionada().titulo">
      {{
        this.parentId == 0
          ? this.arquivo.nome_arquivo
          : getFormaLegislacaoSelecionada().custom
      }}
      <Breadcrumb
        :home="{
          icon: 'pi pi-home',
          url: app_home + '/legislacoes/' + fileId + '/0',
          label: this.arquivo.nome_arquivo
            ? ' ' + this.arquivo.nome_arquivo
            : '',
        }"
        :model="arr_legislacao_parents"
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
            :disabled="!selectedLegislacoes || !selectedLegislacoes.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="legislacoes"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :loading="loading"
        :globalFilterFields="['id_forma_legislacao', 'descricao']"
        v-model:filters="filters"
        v-model:selection="selectedLegislacoes"
        selectionMode="checkbox"
        dataKey="id_forma_legislacao"
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
        <Column field="id_legislacao" header="ID"></Column>
        <Column field="id_forma" header="Tipo">
          <template #body="slotProps">
            {{ getTituloForma(slotProps.data.id_forma) }}
          </template>
        </Column>
        <Column field="legislacao.descricao" header="Descrição"></Column>

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
              @click="editLegislacao(slotProps)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="legislacaoDialog"
      :style="{ width: '450px' }"
      header="Detalhes da Legislação"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="id_forma">Forma do registro</label>
        <Dropdown
          v-model="selectedTipo"
          :options="formas_legislacao.filter((val) => val.id_forma != 1)"
          optionLabel="titulo"
          optionValue="id_forma"
          placeholder="Selecione o formato"
        />
      </div>
      <div class="p-field">
        <label for="descricao">Descrição</label>
        <Textarea
          id="descricao"
          v-model="forma_legislacao.legislacao.descricao"
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
          @click="saveLegislacao"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteLegislacaoDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="forma_legislacao"
          >Você tem certeza que deseja remover
          <b>{{ forma_legislacao.id_forma_legislacao }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteLegislacaoDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="arquivoProduct"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteLegislacoesDialog"
      :style="{ width: '450px' }"
      header="Confirmação de Exclusão"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="forma_legislacao"
          >Você tem certeza que deseja remover a seleção?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteLegislacoesDialog = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedLegislacoes"
        />
      </template>
    </Dialog>
  </div>
</template>
<script src="./Legislacoes.js"></script>
<style lang="scss">
@import "./Legislacoes.scss";
</style>
