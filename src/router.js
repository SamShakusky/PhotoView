import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/HomePage';
import Admin from './views/AdminPage';
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
        store.dispatch('auth/inspectToken')
          .then((isValid) => {
            if (isValid) {
              return next();
            }
            
            return next({
              path: '/login',
            });
          });
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/inspectToken')
          .then((isValid) => {
            if (isValid) {
              return next({
                path: '/admin',
              });
            }
            
            return next();
          });
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  mode: 'history',
});

export default router;
