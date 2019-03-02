<template>
  <div class="grid-adapter">
    <GridContainer>
      <GridItem
        v-for="photo in photos"
        :key="photo.id"
        :height="photo.height"
      >
        {{ photo.id + 1 }}
      </GridItem>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from './GridContainer';
import GridItem from './GridItem';

export default {
  name: 'GridAdapter',
  components: {
    GridContainer,
    GridItem,
  },
  computed: {
    photos() {
      return this.$store.state.photo.data;
    },
  },
};
</script>
