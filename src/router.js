import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/HomePage';
import Admin from './views/AdminPage';
import Todo from './views/TodoPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo,
    },
  ],
  mode: 'history',
});
