<template>
  <div class="grid-adapter">
    <GridContainer>
      <GridItem
        v-for="photo in photos"
        :key="photo.id"
      >
        <template
          slot="item"
          slot-scope="props"
        >
          <AppImage
            :id="photo.id"
            :data-src="photo.url"
            :description="photo.description"
            :signal="props.signal"
            :height="300"
            :hidden="!!activeItem.id"
            :active="activeItem.id && photo.id === activeItem.id"
            @click="showPreview"
          />
        </template>
      </GridItem>
      <Lightbox
        :active="!!activeItem.id"
        :item="activeItem"
        :clone-rect="cloneRect"
        @close="hidePreview"
      />
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import Lightbox from './lightbox';

import AppImage from './app-image';

const defaultPhoto = {
  url: null,
  description: null,
};

export default {
  name: 'GridAdapter',
  
  components: {
    GridContainer,
    GridItem,
    AppImage,
    Lightbox,
  },
  
  data() {
    return {
      activeItem: defaultPhoto,
      cloneRect: {},
    };
  },
  
  computed: {
    photos() {
      return this.$store.state.photo.data;
    },
  },
  
  created() {
    this.$store.dispatch('photo/getPhotos');
  },
  
  methods: {
    showPreview(activeId, imgRect) {
      this.activeItem = this.photos.find(photo => photo.id === activeId);
      this.cloneRect = imgRect;
    },
    
    hidePreview() {
      this.activeItem = defaultPhoto;
    },
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
