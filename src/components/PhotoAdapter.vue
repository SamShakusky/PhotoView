<template>
  <div class="photo-adapter">
    <PhotoForm
      @addPhoto="addPhoto"
    />
    <PhotoTable
      :photos="photos"
      @deletePhoto="deletePhoto"
    />
  </div>
</template>

<script>
import PhotoForm from './PhotoForm';
import PhotoTable from './PhotoTable';

export default {
  name: 'AdminPage',
  components: {
    PhotoForm,
    PhotoTable,
  },
  data() {
    return {
      url: '',
      description: '',
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
    addPhoto(newPhoto) {
      this.$store.dispatch('photo/addPhoto', newPhoto);
      
      this.url = '';
      this.description = '';
    },
    deletePhoto(id) {
      this.$store.dispatch('photo/deletePhoto', { id });
    },
  },
};
</script>

<style scoped>

</style>
