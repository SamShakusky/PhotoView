<template>
  <img
    :data-src="lazySrc"
    :data-srcset="lazySrcset"
    :style="style"
    :title="description"
    class="AppImage"
    :class="{
      'hidden': hidden,
      'active': active,
    }"
    @click="click"
  >
</template>

<script>
import lozad from 'lozad';

const onLoad = (img, callback) => {
  if (img.naturalHeight !== 0) return callback();
  
  return setTimeout(() => onLoad(img, callback), 100);
};

export default {
  name: 'AppImage',
  
  props: {
    id: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '#efefef',
    },
    height: {
      type: Number,
      default: null,
    },
    lazySrc: {
      type: String,
      default: null,
    },
    lazySrcset: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    signal: {
      type: Function,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  
  data() {
    return {
      loading: true,
    };
  },
  
  computed: {
    aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.width || !this.height) return null;

      return (this.height / this.width) * 100;
    },
    style() {
      // The background color is used as a
      // placeholder while loading the image.
      // You can use the dominant color of the
      // image to improve perceived performance.
      // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
      const style = { backgroundColor: this.backgroundColor };
        
      if (this.width) style.width = `${this.width}px`;
        
      // If the image is still loading and an
      // aspect ratio could be calculated, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = this.loading && this.aspectRatio;
      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0;
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`;
      }
        
      return style;
    },
  },
  
  mounted() {
    // As soon as the <img> element triggers
    // the `load` event, the loading state is
    // set to `false`, which removes the apsect
    // ratio we've applied earlier.
    const setLoadingState = () => {
      this.loading = false;
    };
    this.$el.addEventListener('load', setLoadingState);
    // We remove the event listener as soon as
    // the component is destroyed to prevent
    // potential memory leaks.
    this.$once('hook:destroyed', () => {
      this.$el.removeEventListener('load', setLoadingState);
    });

    // We initialize Lozad.js on the root
    // element of our component.
    const observer = lozad(this.$el, {
      loaded: (el) => {
        onLoad(el, () => this.signal(el));
      },
    });
    observer.observe();
  },
  
  methods: {
    click(e) {
      const imgRect = e.currentTarget.getBoundingClientRect();
      
      this.$emit('click', this.id, imgRect);
    },
  },
};


</script>

<style lang="scss" scoped>
  .AppImage {
    @include transitionCubicPlus(opacity .5s, transform .5s);
    cursor: pointer;
  }
  
  .hidden {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 1);
  }
  
  .active {
    visibility: hidden;
  }
</style>
