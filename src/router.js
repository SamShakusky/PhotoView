import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/HomePage';
import Admin from './views/AdminPage';
import Todo from './views/TodoPage';
import Auth from './views/AuthPage';

import store from './store';

Vue.use(Router);

const router = new Router({
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
      beforeEnter: (to, from, next) => {
        if (!store.state.auth.token) {
          // store.dispatch('auth/inspectToken').then(resp => console.log(resp));
          next({
            path: '/login',
          });
          
          return;
        }
        
        next();
      },
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo,
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  mode: 'history',
});

export default router;
