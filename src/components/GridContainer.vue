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
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-auto-rows: 120;
  }
</style>
