import Vue from 'vue';
import Vuex from 'vuex';

import photoModule from './modules/photo';
import snackModule from './modules/snack';
import authModule from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  
  modules: {
    photo: photoModule,
    snack: snackModule,
    auth: authModule,
  },
});

export default store;
