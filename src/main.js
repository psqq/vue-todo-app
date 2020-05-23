import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VuexUndoRedo from 'vuex-undo-redo';

Vue.use(VuexUndoRedo, { ignoreMutations: ['open'] });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
