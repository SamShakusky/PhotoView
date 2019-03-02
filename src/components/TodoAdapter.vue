<template>
  <div class="todo-adapter">
    <TodoAdd @add-todo="addTodo" />
    <TodoList
      :todos="todos"
      @del-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    ...mapGetters([
      'niceTodos',
    ]),
  },
  
  created() {
    this.$store.dispatch('getTodos');
  },
  
  methods: {
    ...mapActions([
      'addTodo',
      'deleteTodo',
    ]),
  },
};
</script>

<style scoped>
  .todo-adapter {
    display: flex;
    flex-direction: column;
  }
</style>
