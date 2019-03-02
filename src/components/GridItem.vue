<template>
  <div
    ref="item"
    class="grid-item"
    :style="styleObjItem"
  >
    <div
      ref="content"
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
      styleObjContent: {
        height: `${this.height}px`,
      },
    };
  },
  mounted() {
    this.getHeight();
  },
  methods: {
    getHeight() {
      const height = this.$refs.content.clientHeight;
      const rowSpan = Math.ceil((height + 10) / (120 + 10));
      
      this.styleObjItem = {
        ...this.styleObj,
        gridRowEnd: `span ${rowSpan}`,
      };
    },
  },
};
</script>

<style scoped>
  .grid-item {
    border: 1px solid steelblue;
    min-height: 50px;
    min-width: 50px;
  }
</style>
