<template>
  <main class="auth-page">
    <AuthAdapter />
  </main>
</template>

<script>
import AuthAdapter from '../components/AuthAdapter';

export default {
  name: 'AuthPage',
  components: {
    AuthAdapter,
  },
};
</script>


<style scoped>
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 66px);
  }
</style>
