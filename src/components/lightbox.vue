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
          ref="imgPreview"
          :src="item.url"
          class="img-preview"
        >
        <img
          :src="item.url"
          :style="rectStyles"
          class="img-clone"
        >
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
    cloneRect: {
      type: [DOMRect, Object],
      default: () => undefined,
    },
  },
  
  data() {
    return {
      loading: true,
      computedStyles: {},
    };
  },
  
  computed: {
    divRect() {
      if (!this.cloneRect) {
        return false;
      }
      const { height, width } = this.cloneRect;
      
      return {
        height: `${height}px`,
        width: `${width}px`,
      };
    },
    
    rectStyles: {
      get() {
        if (!this.cloneRect) {
          return false;
        }
        
        const {
          left, top, height, width,
        } = this.cloneRect;
        
        return {
          left: `${left}px`,
          top: `${top}px`,
          height: `${height}px`,
          width: `${width}px`,
          ...this.computedStyles,
        };
      },
      
      set(newVal) {
        this.computedStyles = newVal;
      },
    },
  },
  
  watch: {
    active(newVal) {
      if (!newVal) {
        this.rectStyles = null;
        return false;
      }
      
      setTimeout(() => {
        const { imgPreview } = this.$refs;
        const imgPreviewRect = imgPreview.getBoundingClientRect();
        
        const {
          x: pX, y: pY, width: pWidth, height: pHeight,
        } = imgPreviewRect;
        const {
          x: cX, y: cY, width: cWidth, height: cHeight,
        } = this.cloneRect;
        
        // Getting translate value
        const pCenter = {
          x: pX + pWidth / 2,
          y: pY + pHeight / 2,
        };
        
        const cCenter = {
          x: cX + cWidth / 2,
          y: cY + cHeight / 2,
        };
        
        const сenterShift = {
          x: pCenter.x - cCenter.x,
          y: pCenter.y - cCenter.y,
        };
        
        const translateValue = `${сenterShift.x}px, ${сenterShift.y}px, 0`;
        
        // Getting scaling factor
        const aspectRatio = imgPreview.naturalWidth / imgPreview.naturalHeight;
        const containedHeight = pWidth / aspectRatio;
        
        const diffRatio = pHeight / cHeight;
        const containedRatio = containedHeight / cHeight;
        
        const tooWide = cWidth * diffRatio > window.innerWidth / 2;
        
        // if the scaled clone width is too wide (wider than half of the window),
        // we should use contained image's true height to get the scaling factor.
        const scalingFactor = tooWide ? containedRatio : diffRatio;
        
        this.rectStyles = {
          transform: `translate3d(${translateValue})
                      scale(${scalingFactor})`,
        };
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
    opacity: 0;
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
  
  .lightbox.active .img-preview {
    animation: previewFadeIn .6s;
    opacity: 1;
  }
  
  .lightbox.active .img-clone {
    animation: cloneFadeOut .6s;
    animation-fill-mode: forwards;
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
    flex: 1;
  }
  
  .main-wrap > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .img-preview {
    object-fit: contain;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 1;
    position: relative;
  }
  
  .img-clone {
    position: absolute;
    left: 0;
    top: 0;
    transition: transform .5s, heigth .5s, width .5s;
    object-fit: contain;
    filter: grayscale();
  }
  
  @keyframes previewFadeIn {
    0% { opacity: 0; }
    99% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes cloneFadeOut {
    99% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>
