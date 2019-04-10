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
    display: grid;
    grid-auto-rows: 0px;
    grid-gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
    margin: auto;
    max-width: 1200px;
  }
</style>
