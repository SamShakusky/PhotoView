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
      <slot
        name="item"
        :signal="getHeight"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridItem',
  
  data() {
    return {
      styleObjItem: {},
      styleObjContent: {},
      // parentVal: () => console.log('ass'),
    };
  },
  
  mounted() {
    // setTimeout(this.getHeight, 3000);
    // this.getHeight();
  },
  
  methods: {
    getHeight(el) {
      const contentHeight = el.clientHeight;
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
