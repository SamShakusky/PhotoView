<template>
  <div>
    <form @submit="addTodo">
      <input
        v-model="title"
        type="text"
        name="title"
        placeholder="Add Todo..."
      >
      <input
        type="submit"
        value="Submit"
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddTodo',
  data() {
    return {
      title: '',
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      
      const newTodo = {
        title: this.title,
        completed: false,
      };
      
      this.$emit('add-todo', newTodo);
      
      this.title = '';
    },
  },
};
</script>

<style scoped>
  form {
    display: flex;
    margin-bottom: 24px;
  }
  
  input {
    flex: 1;
  }
</style>
