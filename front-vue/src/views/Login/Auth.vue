<template>
  <div id="app">
    <v-app id="inspire">
      <v-layout row justify-center>
        <v-dialog
          v-model="loading"
          persistent
          fullscreen
          content-class="loading-dialog"
        >
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="blue"
              ></v-progress-circular>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
    </v-app>
  </div>
</template>
<script src="./Auth.js"></script>
