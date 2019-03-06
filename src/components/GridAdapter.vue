<template>
  <div class="grid-adapter">
    <GridContainer>
      <GridItem
        v-for="photo in photos"
        :key="photo.id"
        :height="photo.height"
      >
        <!-- {{ photo.id + 1 }} -->
        <!-- <img :src="photo.post_url"> -->
        <!-- <AppImage
          :height="200"
          :background-color="'#b0897e'"
          :src="photo.post_url"
          scope="{formData}"
        /> -->
        <template
          slot="item"
          scope="props"
        >
          <AppImage
            :data-src="photo.post_url"
            :signal="props.signal"
            :height="300"
          />
        </template>
      </GridItem>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from './GridContainer';
import GridItem from './GridItem';

import AppImage from './app-image';

export default {
  name: 'GridAdapter',
  
  components: {
    GridContainer,
    GridItem,
    AppImage,
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
