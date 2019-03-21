<template>
  <tr>
    <td>{{ id }}</td>
    <td>
      <a
        :href="url"
        target="_blank"
      >
        {{ url }}
      </a>
    </td>
    <td>{{ description }}</td>
    <td>{{ createdDate }}</td>
    <td>
      <button @click="$emit('deletePhoto')">
        X
      </button>
    </td>
  </tr>
</template>

<script>

export default {
  name: 'PhotoTableRow',
  props: {
    id: {
      type: String,
      default() {
        return '';
      },
    },
    url: {
      type: String,
      default() {
        return '';
      },
    },
    description: {
      type: String,
      default() {
        return '';
      },
    },
    createdDate: {
      type: String,
      default() {
        return '';
      },
    },
  },
};
</script>

<style scoped>
  tr:nth-child(odd) td {
    background-color: lightgray;
  }
  
  td {
    padding: 6px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  a {
    white-space: nowrap;
  }
</style>
