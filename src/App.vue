<template>
  <v-app>
    <Header :current-page="currentPage" />
    <router-view />
    <SnackAdapter />
  </v-app>
</template>

<script>
import { VApp } from 'vuetify/lib';
import Header from './components/layout/Header';
import SnackAdapter from './components/SnackAdapter';

export default {
  name: 'App',
  components: {
    VApp,
    Header,
    SnackAdapter,
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
  },
};
</script>

<style>
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Helvetica, sans-serif;
    line-height: 1.4;
  }
</style>
