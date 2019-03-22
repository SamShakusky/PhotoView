<template>
  <div class="photo-adapter">
    <v-btn
      @click="openDialog"
    >
      Add Photo
    </v-btn>
    <PhotoForm
      :dialog="dialog"
      :edited-photo="editedPhoto"
      :dialog-title="dialogTitle"
      @closeDialog="closeDialog"
      @addPhoto="addPhoto"
    />
    <PhotoTable
      :photos="photos"
      @editPhoto="openDialog"
      @deletePhoto="deletePhoto"
    />
  </div>
</template>

<script>
import { VBtn } from 'vuetify/lib';

import PhotoForm from './PhotoForm';
import PhotoTable from './PhotoTable';

const defaultPhoto = {
  url: '',
  description: '',
};

export default {
  name: 'AdminPage',
  components: {
    VBtn,
    PhotoForm,
    PhotoTable,
  },
  data() {
    return {
      dialog: false,
      editedPhoto: defaultPhoto,
      dialogTitle: '',
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
    
    openDialog(photoId) {
      let editedPhoto;
      console.log(photoId);
      if (photoId) {
        editedPhoto = this.photos.find(x => x.id === photoId);
        this.editedPhoto = editedPhoto;
        this.dialogTitle = 'Edit Photo';
      }
      
      this.dialog = true;
    },
    
    closeDialog() {
      this.editedPhoto = defaultPhoto;
      this.dialog = false;
      this.dialogTitle = 'Add Photo';
    },
    
    deletePhoto(id) {
      this.$store.dispatch('photo/deletePhoto', { id });
    },
  },
};
</script>

<style scoped>

</style>
