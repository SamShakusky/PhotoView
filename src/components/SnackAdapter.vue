<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackColor"
    :timeout="timeout"
  >
    {{ snackText }}
  </v-snackbar>
</template>

<script>
import { VSnackbar } from 'vuetify/lib';

export default {
  name: 'SnackAdapter',
  
  components: {
    VSnackbar,
  },
  
  data() {
    return {
      snackbar: false,
      timeout: 4000,
    };
  },
  
  computed: {
    snackText() {
      return this.$store.state.snack.data.text;
    },
    snackColor() {
      return this.$store.state.snack.data.color;
    },
  },
  
  watch: {
    snackText(newVal) {
      if (newVal.length) {
        this.snackbar = true;
        setTimeout(() => {
          this.$store.commit('snack/toggleSnack', { text: '' });
        }, this.timeout);
      }
    },
  },
};
</script>

<style scoped>

</style>
