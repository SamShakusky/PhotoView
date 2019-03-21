<template>
  <main>
    <PhotoAdapter />
  </main>
</template>

<script>
import PhotoAdapter from '../components/PhotoAdapter';

export default {
  name: 'AdminPage',
  components: {
    PhotoAdapter,
  },
};
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    margin: 80px auto;
  }
</style>
