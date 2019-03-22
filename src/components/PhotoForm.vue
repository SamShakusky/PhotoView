<template>
  <div
    class="dialog-overlay"
    :class="{'active': dialog}"
    @click="close"
  >
    <v-dialog
      v-model="dialog"
      max-width="500px"
      :hide-overlay="true"
      :persistent="true"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        
        <v-card-text>
          <v-text-field
            v-model="editItem.url"
            label="Url"
          />
          <v-text-field
            v-model="editItem.description"
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
  </div>
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
  name: 'PhotoForm',
  
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
      default: () => null,
    },
    editedPhoto: {
      type: Object,
      default: () => {},
    },
    dialogTitle: {
      type: String,
      default: () => '',
    },
    sendPhoto: {
      type: Function,
      default: () => null,
    },
  },
  
  computed: {
    editItem() {
      return { ...this.editedPhoto };
    },
  },
  
  methods: {
    save() {
      const editPhoto = {
        ...this.editItem,
      };
      
      this.$emit('sendPhoto', editPhoto);
    },
    
    close() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style scoped>
  .dialog-overlay {
    background: rgba(0, 0, 0, .4);
    height: 100vh;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    transition: .2s opacity;
    width: 100vw;
  }
  
  .dialog-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
</style>
