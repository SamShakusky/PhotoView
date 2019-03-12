<template>
  <main>
    <form @submit="addPhoto">
      <input
        v-model="url"
        type="text"
        name="url"
        placeholder="Url"
      >
      <input
        v-model="description"
        type="text"
        name="description"
        placeholder="Description"
      >
      <input
        type="submit"
        value="Submit"
      >
    </form>
    <table>
      <thead>
        <td>Id</td>
        <td>URL</td>
        <td>Description</td>
        <td>Created</td>
        <td />
      </thead>
      <tbody>
        <tr
          v-for="photo in photos"
          :key="photo.id"
        >
          <td>{{ photo.id }}</td>
          <td>
            <a
              :href="photo.url"
              target="_blank"
            >
              {{ photo.url }}
            </a>
          </td>
          <td>{{ photo.description }}</td>
          <td>{{ photo.created_date }}</td>
          <td>
            <button @click="deletePhoto(photo.id)">
              X
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>

export default {
  name: 'AdminPage',
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
    addPhoto(e) {
      e.preventDefault();
      
      const newPhoto = {
        url: this.url,
        description: this.description,
      };
      
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
  main {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    margin: 80px auto;
  }
  
  table {
    border-spacing: 0;
    margin-top: 24px;
  }
  
  thead {
    font-weight: bold;
  }
  
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
