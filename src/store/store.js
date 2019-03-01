import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
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
        completed: 'false',
      },
    ],
  },
});

export default store;
