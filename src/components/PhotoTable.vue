<template>
  <v-data-table
    :headers="headers"
    :items="photosComp"
    :rows-per-page-items="[15,30,60]"
    :disable-initial-sort="true"
    class="table"
  >
    <template v-slot:items="props">
      <tr @click="editPhoto(props.item.id)">
        <td>
          <span>
            <img :src="props.item.url">
          </span>
        </td>
        <td>{{ props.item.description }}</td>
        <td>{{ formatDate(props.item.created_date) }}</td>
        <td>{{ props.item.id }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import {
  VDataTable,
} from 'vuetify/lib';

export default {
  name: 'PhotoTable',
  
  components: {
    VDataTable,
  },
  
  props: {
    photos: {
      type: Array,
      default() {
        return null;
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
      photoShit: this.photos,
    };
  },
  
  computed: {
    photosComp() {
      return this.photos;
    },
  },
  
  methods: {
    editPhoto(id) {
      this.$emit('editPhoto', id);
    },
    
    formatDate(date) {
      const formated = new Date(date);
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
      };
      
      return formated.toLocaleString('ru-RU', options);
    },
  },
};
</script>

<style scoped>
  .table {
    width: 900px;
  }
  
  thead {
    font-weight: bold;
  }
  
  tr {
    cursor: pointer;
  }
  
  span {
    height: 100px;
    width: 100px;
    display: block;
  }
  
  img {
    object-fit: contain;
    height: 100%;
    width: 100px;
  }
</style>
