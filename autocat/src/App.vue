<template>
  <v-app>
    <v-app-bar
      app
      color=""
      light
    >
      <div class="d-flex align-center">
        <v-img
          alt="AutoCat Logo"
          class=""
          contain
          src="./assets/AUTOCAT_2.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">SEARCH CATALOG</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <SearchPage/>
    </v-main>
  </v-app>
</template>

<script>
import SearchPage from './components/SearchPage';
export default {
  name: 'App',

  components: {
    SearchPage,
  },

  data: () => ({
    //
  }),
};
</script>

<style>

</style>
