<template>
  <main>
    <TodoAdapter />
  </main>
</template>

<script>
import TodoAdapter from '../components/TodoAdapter';

export default {
  name: 'TodoPage',
  components: {
    TodoAdapter,
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
