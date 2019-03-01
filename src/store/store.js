import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    todos: [
      {
        id: 0,
        title: 'first',
        completed: 'false',
      },
      {
        id: 1,
        title: 'second',
        completed: 'true',
      },
    ],
  },
  getters: {
    niceTodos: state => state.todos.map(todo => ({
      id: todo.id,
      title: `nice_${todo.title}`,
      completed: todo.completed,
    })),
  },
  mutations: {
    // addTodo: (newTodo) => {
    //   this.$store.state.todos = [...this.$store.state.todos, newTodo];
    // },
    mutate: (state) => {
      state.todos.forEach((todo) => {
        todo.title += 'Mutata!'; // eslint-disable-line no-param-reassign
      });
    },
  },
});

export default store;
