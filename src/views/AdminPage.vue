<template>
  <main>
    <form @submit="addPhoto">
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
    <ol>
      <li
        v-for="photo in photos"
        :key="photo.id"
      >
        {{ photo.description }}
        <button @click="deletePhoto(photo.id)">
          X
        </button>
      </li>
    </ol>
  </main>
</template>

<script>

export default {
  name: 'AdminPage',
  data() {
    return {
      description: '',
    };
  },
  computed: {
    photos() {
      return this.$store.state.photo.temp;
    },
  },
  created() {
    this.$store.dispatch('photo/getPhotos');
  },
  methods: {
    addPhoto(e) {
      e.preventDefault();
      
      const newPhoto = {
        description: this.description,
      };
      
      this.$store.dispatch('photo/addPhoto', newPhoto);
      
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
    max-width: 500px;
    margin: 80px auto;
  }
</style>
