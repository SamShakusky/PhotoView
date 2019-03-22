<template>
  <v-data-table
    :headers="headers"
    :items="photos"
  >
    <template v-slot:items="props">
      <!--
        @deletePhoto="$emit('deletePhoto', photo.id)"
      /> -->
      <tr @click="editPhoto(props.item.id)">
        <td>
          <span>
            <img :src="props.item.url">
          </span>
        </td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.created_date }}</td>
        <td>{{ props.item.id }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { VDataTable, VEditDialog, VTextField } from 'vuetify/lib';

export default {
  name: 'PhotoTable',
  components: {
    VDataTable,
    VEditDialog,
    VTextField,
  },
  props: {
    photos: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Url',
          value: 'url',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'Created',
          value: 'created',
        },
        {
          text: 'Id',
          value: 'id',
        },
      ],
    };
  },
  methods: {
    editPhoto(id) {
      this.$emit('editPhoto', id);
    },
  },
};
</script>

<style scoped>
  table {
    border-spacing: 0;
    margin-top: 24px;
  }
  
  thead {
    font-weight: bold;
  }
  
  span {
    height: 100px;
    width: 100px;
    display: block;
  }
  
  img {
    object-fit: cover;
    height: 100px;
    width: 100px;
  }
</style>
