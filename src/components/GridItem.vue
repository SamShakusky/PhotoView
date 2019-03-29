<template>
  <div
    ref="item"
    class="grid-item"
    :class="{
      'active': active,
    }"
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
  
  props: {
    active: {
      type: Boolean,
      default: () => false,
    },
  },
  
  data() {
    return {
      styleObjItem: {},
      styleObjContent: {},
    };
  },
  
  methods: {
    getHeight(el) {
      const contentHeight = el.clientHeight;
      const rowSpan = Math.ceil((contentHeight) / 6);
      
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
  
  .active {
    z-index: 101;
  }
</style>
