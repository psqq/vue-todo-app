import Vue from 'vue';
import Vuex from 'vuex';
import id from 'shortid';

Vue.use(Vuex);

function createNote(title = '', todo = []) {
  return {
    id: id(),
    title,
    todo,
  };
}

export default new Vuex.Store({
  state: {
    notes: [
      createNote('Create this app', [
        { title: 'Create home page', done: false },
        { title: 'Create note page', done: false },
      ]),
    ],
    note: null,
  },
  mutations: {
    createEmptyNote(state) {
      state.note = createNote();
    }
  },
  actions: {
  },
  modules: {
  }
});
