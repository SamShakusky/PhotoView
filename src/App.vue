<template>
  <div id="app">
    <Header />
    <main>
      <AddTodo v-on:add-todo="addTodo" />
      <Todos
        v-bind:todos="todos"
        v-on:del-todo="deleteTodo"
      />
    </main>
  </div>
</template>

<script>
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

export default {
  name: 'app',
  components: {
    Header,
    AddTodo,
    Todos,
  },
  data() {
    return {
      todos: [
        {
          id: 0,
          title: 'Todo one',
          completed: false,
        },
        {
          id: 1,
          title: 'Todo two',
          completed: true,
        },
      ]
    }
  },
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    addTodo(newTodo) {
      this.todos = [...this.todos, newTodo];
    }
  }
}
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
