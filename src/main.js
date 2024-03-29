import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/src/stylus/app.styl';
import 'vuetify/dist/vuetify.min.css';

import store from './store';

Vue.use(Vuetify, {
  iconfont: 'mdi',
});
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
