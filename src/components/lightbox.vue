<template>
  <div
    class="lightbox"
    :class="{
      'active': active,
      'fadeOut': fadeOut,
    }"
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
    <div class="descr-wrap">
      <h2 class="photo-title">
        {{ photoTitle }}
      </h2>
      <p class="photo-descr">
        {{ photoDescr }}
      </p>
    </div>
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
      default: () => {},
    },
    active: {
      type: Boolean,
      default: () => false,
    },
    fadeOut: {
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
    
    photoTitle() {
      if (!this.item.id) {
        return false;
      }
      
      return `Photo ${this.item.id.slice(-4)}`;
    },
    
    photoDescr() {
      if (!this.item.id) {
        return false;
      }
      
      return this.item.description;
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


<style lang="scss" scoped>
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
    
    &:before {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      height: 100%;
      width: 100%;
      transition: background .4s .1s;
      z-index: -1;
    }
    
    &.active {
      opacity: 1;
      pointer-events: auto;
      
      &:before {
        background: white;
      }
      
      .img-preview {
        animation: previewFadeIn .6s;
        opacity: 1;
      }
      
      .img-clone {
        animation: cloneFadeOut .6s;
        animation-fill-mode: forwards;
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
      
      .photo-title,
      .photo-descr {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    &.fadeOut {
      opacity: 0;
      transition-property: opacity;
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      transition-duration: .5s;
      
      .photo-wrap,
      .descr-wrap {
        transition-property: transform, opacity;
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        transition-duration: .5s;
      }
      
      .photo-wrap {
        transform: translateY(-60px);
      }
      
      .descr-wrap {
        transform: translateY(60px);
      }
    }
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
    padding: 0 12px;
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
  }
  
  .descr-wrap {
    padding: 0 32px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  
  .photo-title,
  .photo-descr {
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-duration: .6s;
    opacity: 0;
    transform: translateY(30px);
  }
  
  .photo-title {
    font-size: 2.7rem;
    font-weight: normal;
    line-height: normal;
    transition-delay: .4s;
  }
  
  .photo-descr {
    font-size: 1.6rem;
    margin: 1.6rem 0;
    transition-delay: .5s;
  }
</style>
