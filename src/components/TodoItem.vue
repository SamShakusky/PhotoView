<template>
  <div
    class="todo-item"
  >
    <input
      type="checkbox"
      v-on:change="markComplete"
      v-bind:checked="todo.completed"
    >
    <p
      v-bind:class="{'is-complete': todo.completed}"
    >
      {{todo.title}}
    </p>
    <button
      @click="$emit('del-todo', todo.id)"
      class="del"
    >
      X
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    markComplete() {
      this.todo.completed = ! this.todo.completed;
    }
  }
}
</script>

<style scoped>
  .todo-item {
    box-shadow: 1px 2px 6px #ccc;
    margin-bottom: 12px;
    padding: 6px;
    display: flex;
    align-items: center;
  }
  
  .is-complete {
    text-decoration: line-through;
  }
  
  input {
    margin-right: 6px;
  }
  
  p {
    flex: 1;
  }
  
  .del {
    border-radius: 50%;
    border: 0;
    padding: 6px;
    width: 27px;
    text-align: center;
    background: tomato;
    text-decoration: none;
  }
</style>
