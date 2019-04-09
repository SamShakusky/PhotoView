<template>
  <div class="photo-adapter">
    <v-btn
      color="primary"
      @click.stop="openDialog()"
    >
      Add Photo
    </v-btn>
    <PhotoForm
      :dialog="dialog"
      :edited-photo="editedPhoto"
      :dialog-title="dialogTitle"
      @sendPhoto="sendPhoto"
      @closeDialog="closeDialog"
      @deletePhoto="deletePhoto"
    />
    <PhotoTable
      :photos="photos"
      @editPhoto="openDialog"
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
  name: 'PhotoAdapter',
  
  components: {
    VBtn,
    PhotoForm,
    PhotoTable,
  },
  
  data() {
    return {
      dialog: false,
      editedPhoto: defaultPhoto,
      dialogTitle: 'Add Photo',
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
    sendPhoto(photo) {
      this.$store.dispatch('photo/setPhoto', photo);
    },
    
    openDialog(photoId) {
      let editedPhoto;
      
      if (photoId) {
        editedPhoto = this.photos.find(x => x.id === photoId);
        this.editedPhoto = editedPhoto;
        this.dialogTitle = 'Edit Photo';
      } else {
        this.editedPhoto = defaultPhoto;
        this.dialogTitle = 'Add Photo';
      }
      
      this.dialog = true;
    },
    
    closeDialog() {
      this.dialog = false;
    },
    
    deletePhoto(id) {
      this.$store.dispatch('photo/deletePhoto', { id });
    },
  },
};
</script>
