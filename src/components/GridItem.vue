<template>
  <div class="grid-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GridItem',
};
</script>

<style scoped>
  .grid-item {
    border: 1px solid steelblue;
    height: 50px;
    width: 50px;
  }
</style>
