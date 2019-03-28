<template>
  <div
    class="lightbox"
    :class="{'active': active}"
  >
    <v-btn
      flat
      icon
      class="close-btn"
      :absolute="true"
      @click="$emit('close')"
    >
      <v-icon small>
        mdi-close
      </v-icon>
    </v-btn>
    <div class="photo-wrap">
      <img
        :src="item.url"
        class="img-main"
      >
    </div>
    <div class="descr-wrap" />
  </div>
</template>

<script>
import {
  VBtn,
  VIcon,
} from 'vuetify/lib';

export default {
  name: 'Lightbox',
  
  components: {
    VBtn,
    VIcon,
  },
  
  props: {
    item: {
      type: Object,
      default: () => ({
        url: null,
      }),
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },
  
  data() {
    return {
      loading: true,
    };
  },
};


</script>

<style scoped>
  .lightbox {
    position: fixed;
    z-index: 100;
    background: black;
    display: flex;
    height: 100vh;
    width: 100vw;
    top: 0;
    pointer-events: none;
    opacity: 0;
  }
  
  .lightbox.active {
    opacity: 1;
    pointer-events: auto;
  }
  
  .close-btn {
    right: 32px;
    top: 6px;
  }
  
  .photo-wrap,
  .descr-wrap {
    height: 100%;
    width: 50%;
  }
  
  .photo-wrap {
    background: lightblue;
    display: flex;
    justify-content: center;
  }
  
  .descr-wrap {
    background: lightcoral;
  }
  
  .img-main {
    object-fit: contain;
    height: 100%;
  }
</style>
