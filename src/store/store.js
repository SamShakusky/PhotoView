import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  
  state: {
    todos: [],
  },
  
  getters: {
    niceTodos: state => state.todos.map(todo => ({
      id: todo.id,
      title: `nice_${todo.title}`,
      completed: todo.completed,
    })),
  },
  
  /* eslint-disable no-param-reassign */
  mutations: {
    getTodos: (state, todoList) => {
      state.todos = todoList;
    },
    addTodo: (state, newTodo) => {
      state.todos = [...state.todos, newTodo];
    },
    deleteTodo: (state, filteredTodoList) => {
      state.todos = filteredTodoList;
    },
  },
  /* eslint-enable no-param-reassign */
  
  actions: {
    getTodos: (context) => {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then((res) => {
          context.commit('getTodos', res.data);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
    
    addTodo: (context, payload) => {
      const { title, completed } = payload;
      
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed,
      })
        .then((res) => {
          context.commit('addTodo', res.data);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
    
    deleteTodo: (context, id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
          const filteredTodoList = context.state.todos.filter(todo => todo.id !== id);
          context.commit('deleteTodo', filteredTodoList);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
  },
});

export default store;
