<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import { VApp } from 'vuetify/lib';
import Header from './components/layout/Header';

export default {
  name: 'App',
  components: {
    VApp,
    Header,
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
