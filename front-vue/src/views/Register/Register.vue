<template>
  <div class="container">
    <div class="card card-default">
      <div class="card-header">Inscrição</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="has_error && !success">
          <p v-if="error == 'registration_validation_error'">
            Erro de validação
          </p>
          <p v-else>
            Erro. Foi impossível continuar nomomento. <br />
            Se o problema persistir, contate o administrador.
          </p>
        </div>
        <form
          autocomplete="off"
          @submit.prevent="register"
          v-if="!success"
          method="post"
        >
          <div
            class="form-group"
            v-bind:class="{ 'has-error': has_error && errors.email }"
          >
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="user@example.com"
              v-model="email"
            />
            <span class="help-block" v-if="has_error && errors.email">{{
              errors.email
            }}</span>
          </div>
          <div
            class="form-group"
            v-bind:class="{ 'has-error': has_error && errors.password }"
          >
            <label for="password">Senha</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
            />
            <span class="help-block" v-if="has_error && errors.password">{{
              errors.password
            }}</span>
          </div>
          <div
            class="form-group"
            v-bind:class="{ 'has-error': has_error && errors.password }"
          >
            <label for="password_confirmation">Confirme a senha</label>
            <input
              type="password"
              id="password_confirmation"
              class="form-control"
              v-model="password_confirmation"
            />
          </div>
          <button type="submit" class="btn btn-default">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script src="./Register.js"></script>
<style lang="scss">
@import "./Register.scss";
</style>
