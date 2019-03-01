<template>
  <div class="todo-adapter">
    <TodoAdd @add-todo="addTodo" />
    <TodoList
      :todos="niceTodos"
      @del-todo="deleteTodo"
    />
    <button @click="mutate">
      mutate
    </button>
  </div>
</template>

<script>
// import axios from 'axios';

import TodoAdd from './TodoAdd';
import TodoList from './TodoList';

export default {
  name: 'TodoAdapter',
  components: {
    TodoAdd,
    TodoList,
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    niceTodos() {
      return this.$store.getters.niceTodos;
    },
  },
  // data() {
  //   return {
  //     todos: [],
  //   };
  // },
  // created() {
  //   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //     .then((res) => {
  //       this.todos = res.data;
  //     })
  //     .catch(err => console.error(err)); // eslint-disable-line no-console
  // },
  methods: {
    mutate() {
      this.$store.commit('mutate');
    },
  },
  //   deleteTodo(id) {
  //     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
  //       .then(() => {
  //         this.todos = this.todos.filter(todo => todo.id !== id);
  //       })
  //       .catch(err => console.error(err)); // eslint-disable-line no-console
  //   },
  //   addTodo(newTodo) {
  //     const { title, completed } = newTodo;
      
  //     axios.post('https://jsonplaceholder.typicode.com/todos', {
  //       title,
  //       completed,
  //     })
  //       .then((res) => {
  //         this.todos = [...this.todos, res.data];
  //       })
  //       .catch(err => console.error(err)); // eslint-disable-line no-console
  //   },
  // },
};
</script>

<style scoped>
  .todo-adapter {
    display: flex;
    flex-direction: column;
  }
</style>
