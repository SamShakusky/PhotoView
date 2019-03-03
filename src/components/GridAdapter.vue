<template>
  <div class="grid-adapter">
    <GridContainer>
      <GridItem
        v-for="photo in photos"
        :key="photo.id"
        :height="photo.height"
      >
        <!-- {{ photo.id + 1 }} -->
        <img :src="photo.post_url">
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
  
  created() {
    // this.$store.dispatch('photo/getPhotos');
  },
};
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
