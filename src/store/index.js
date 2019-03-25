import Vue from 'vue';
import Vuex from 'vuex';

import todoModule from './modules/todo';
import photoModule from './modules/photo';
import snackModule from './modules/snack';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  
  modules: {
    todo: todoModule,
    photo: photoModule,
    snack: snackModule,
  },
});

export default store;
