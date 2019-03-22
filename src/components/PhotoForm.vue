<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ dialogTitle }}</span>
      </v-card-title>
      
      <v-card-text>
        <v-text-field
          v-model="editedPhoto.url"
          label="Url"
        />
        <v-text-field
          v-model="editedPhoto.description"
          label="Description"
        />
      </v-card-text>
      
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          flat
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
  VBtn,
} from 'vuetify/lib';

export default {
  name: 'AdminPage',
  components: {
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTextField,
    VBtn,
  },
  props: {
    dialog: {
      type: Boolean,
      default: () => false,
    },
    editedPhoto: {
      type: Object,
      default: () => ({
        url: '',
        description: '',
      }),
    },
    dialogTitle: {
      type: String,
      default: () => 'Add Photo',
    },
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
    
    close() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style scoped>

</style>
