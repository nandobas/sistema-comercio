<template>
  <div class="container">
    <div class="card card-default">
      <div class="card-header">Logar</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="has_error">
          <p>Erreur, impossible de se connecter avec ces identifiants.</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="user@example.com"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-default">Conectar</button>
        </form>
      </div>
    </div>
    <router-link to="/register">Desejo me Cadastrar</router-link>
    <div></div>
  </div>
</template>
<script src="./Login.js"></script>
<style lang="scss">
@import "./Login.scss";
</style>
