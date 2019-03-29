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
      <div class="main-wrap">
        <img
          :src="item.url"
          class="img-main"
        >
        <div
          ref="cliche"
          :style="divRect"
        />
      </div>
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
    gridImgRect: {
      type: [DOMRect, Object],
      default: () => undefined,
    },
  },
  
  data() {
    return {
      loading: true,
    };
  },
  
  computed: {
    divRect() {
      if (!this.gridImgRect) {
        return false;
      }
      const { height, width } = this.gridImgRect;
      
      return {
        height: `${height}px`,
        width: `${width}px`,
      };
    },
  },
  
  watch: {
    active(newVal) {
      if (!newVal) {
        return false;
      }
      
      setTimeout(() => {
        const clicheRect = this.$refs.cliche.getBoundingClientRect();
        this.$emit('setClicheRect', clicheRect);
      }, 100);
      
      return newVal;
    },
  },
};

</script>


<style scoped>
  .lightbox {
    position: fixed;
    z-index: 100;
    display: flex;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  
  .lightbox:before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    height: 100%;
    width: 100%;
    transition: background .4s .1s;
  }
  
  .lightbox.active {
    opacity: 1;
    pointer-events: auto;
  }
  
  .lightbox.active:before {
    background: white;
  }
  
  .lightbox.active .img-main {
    animation: mainImg .6s;
    opacity: 1;
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
    display: flex;
    justify-content: center;
  }
  
  .main-wrap {
    position: relative;
    z-index: 1;
  }
  
  .main-wrap > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .img-main {
    object-fit: contain;
    height: 100%;
    opacity: 0;
  }
  
  .img-clone {
    position: absolute;
    left: 0;
    top: 0;
    transition: transform .5s, heigth .5s, width .5s;
    object-fit: contain;
    filter: grayscale();
  }
  
  @keyframes mainImg {
    0% { opacity: 0; }
    99% { opacity: 0; }
    100% { opacity: 1; }
   }
</style>
