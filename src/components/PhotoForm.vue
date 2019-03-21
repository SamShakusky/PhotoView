<template>
  <form @submit="addPhoto">
    <input
      v-model="url"
      type="text"
      name="url"
      placeholder="Url"
    >
    <input
      v-model="description"
      type="text"
      name="description"
      placeholder="Description"
    >
    <v-btn
      type="submit"
    >
      Submit
    </v-btn>
  </form>
</template>

<script>
import { VBtn } from 'vuetify/lib';

export default {
  name: 'AdminPage',
  components: {
    VBtn,
  },
  data() {
    return {
      url: '',
      description: '',
    };
  },
  methods: {
    addPhoto(e) {
      e.preventDefault();
      
      const newPhoto = {
        url: this.url,
        description: this.description,
      };
      
      this.$emit('addPhoto', newPhoto);
      
      this.url = '';
      this.description = '';
    },
  },
};
</script>

<style scoped>

</style>
