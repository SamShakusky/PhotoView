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
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
    grid-auto-rows: 0px;
  }
</style>
