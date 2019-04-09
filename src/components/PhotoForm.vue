<template>
  <div
    class="dialog-overlay"
    :class="{'active': dialog}"
    @click="closeDialog"
  >
    <v-dialog
      v-model="dialog"
      max-width="500px"
      :hide-overlay="true"
      :persistent="true"
    >
      <v-card>
        <v-btn
          flat
          icon
          color="error"
          class="delete-btn"
          :class="{'visible': editItem.id}"
          :absolute="true"
          @click="deletePhoto"
        >
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
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
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="savePhoto"
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
  VIcon,
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
    VIcon,
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
    savePhoto() {
      const editPhoto = {
        ...this.editItem,
      };
      
      this.$emit('sendPhoto', editPhoto);
      this.closeDialog();
    },
    
    closeDialog() {
      this.$emit('closeDialog');
    },
    
    deletePhoto() {
      // eslint-disable-next-line
      const conf = confirm('Are you sure? You won\'t be able to undo this action.');
      
      if (conf) {
        this.$emit('deletePhoto', this.editItem.id);
        this.closeDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
    
    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
  
  .v-card {
    padding: 4px 8px;
  }
  
  .v-card__actions {
    justify-content: flex-end;
  }
  
  .delete-btn {
    top: 18px;
    right: 24px;
    display: none;
    
    &.visible {
      display: inline-flex;
    }
  }
</style>
