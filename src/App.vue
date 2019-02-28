<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/layout/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>


<style scoped>
  main {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 80px auto;
  }
</style>

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
