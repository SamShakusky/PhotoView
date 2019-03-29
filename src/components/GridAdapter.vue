<template>
  <div class="grid-adapter">
    <GridContainer>
      <GridItem
        v-for="photo in photos"
        :key="photo.id"
        :active="activeItem.id && photo.id === activeItem.id"
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
            :hidden="activeItemVisible && photo.id !== activeItem.id"
            :active="activeItemVisible && photo.id === activeItem.id"
            :cliche-rect="clicheRect"
            @click="hideItems"
          />
        </template>
      </GridItem>
      <Lightbox
        :active="activeItemVisible"
        :item="activeItem"
        :grid-img-rect="imgRect"
        @close="showItems"
        @setClicheRect="setClicheRect"
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
      activeItemVisible: false,
      imgRect: {},
      clicheRect: {},
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
    hideItems(data) {
      this.activeItem = this.photos.find(photo => photo.id === data.id);
      this.activeItemVisible = true;
      this.imgRect = data.sizes;
    },
    
    showItems() {
      this.activeItemVisible = false;
      setTimeout(() => {
        this.activeItem = defaultPhoto;
      }, 600);
    },
    
    setClicheRect(data) {
      this.clicheRect = data;
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
