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
import { createNamespacedHelpers } from 'vuex';

import TodoAdd from './TodoAdd';
import TodoList from './TodoList';

const { mapActions, mapGetters } = createNamespacedHelpers('todo');

export default {
  name: 'TodoAdapter',
  
  components: {
    TodoAdd,
    TodoList,
  },
  
  computed: {
    todos() {
      return this.$store.state.todo.todos;
    },
    ...mapGetters([
      'niceTodos',
    ]),
  },
  
  created() {
    this.$store.dispatch('todo/getTodos');
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
