<template>
  <div id="app">
    <main>
      <AddTodo @add-todo="addTodo" />
      <Todos
        :todos="todos"
        @del-todo="deleteTodo"
      />
    </main>
  </div>
</template>

<script>
import axios from 'axios';

import AddTodo from '../components/AddTodo';
import Todos from '../components/Todos';

export default {
  name: 'Home',
  components: {
    AddTodo,
    Todos,
  },
  data() {
    return {
      todos: [],
    };
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => {
        this.todos = res.data;
      })
      .catch(err => console.error(err)); // eslint-disable-line no-console
  },
  methods: {
    deleteTodo(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
          this.todos = this.todos.filter(todo => todo.id !== id);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed,
      })
        .then((res) => {
          this.todos = [...this.todos, res.data];
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
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

<style>
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Helvetica, sans-serif;
    line-height: 1.4;
  }
</style>
