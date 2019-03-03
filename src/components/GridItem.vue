<template>
  <div
    ref="item"
    class="grid-item"
    :style="styleObjItem"
  >
    <div
      ref="content"
      class="grid-item-content"
      :style="styleObjContent"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridItem',
  
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  
  data() {
    return {
      styleObjItem: {},
      styleObjContent: {},
    };
  },
  
  mounted() {
    setTimeout(this.getHeight, 3000);
  },
  
  methods: {
    getHeight() {
      const contentHeight = this.$refs.content.clientHeight;
      const rowSpan = Math.ceil((contentHeight + 10) / 10);
      
      this.styleObjItem = {
        gridRowEnd: `span ${rowSpan}`,
      };
      
      this.styleObjContent = {
        height: '100%',
      };
    },
  },
};
</script>

<style scoped>
  .grid-item {
    min-height: 50px;
    min-width: 50px;
  }
  
  .grid-item-content {
    overflow: hidden;
  }
</style>
