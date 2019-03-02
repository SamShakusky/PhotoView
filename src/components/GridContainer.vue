<template>
  <div class="grid-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GridContainer',
};
</script>

<style scoped>
  .grid-container {
    max-width: 1024px;
    margin: auto;
  }
</style>
