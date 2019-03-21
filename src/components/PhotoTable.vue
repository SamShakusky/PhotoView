<template>
  <table>
    <thead>
      <td>Id</td>
      <td>URL</td>
      <td>Description</td>
      <td>Created</td>
      <td />
    </thead>
    <tbody>
      <PhotoTableRow
        v-for="photo in photos"
        :id="photo.id"
        :key="photo.id"
        :url="photo.url"
        :description="photo.description"
        :created_date="photo.created_date"
        @deletePhoto="$emit('deletePhoto', photo.id)"
      />
    </tbody>
  </table>
</template>

<script>
import PhotoTableRow from './PhotoTableRow';

export default {
  name: 'PhotoTable',
  components: {
    PhotoTableRow,
  },
  props: {
    photos: {
      type: Array,
      default() {
        return [];
      },
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
</style>
