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
        { title: 'Create note page', done: false },
      ]),
      createNote('Test note 1', [
        { title: 'Task 1', done: false },
        { title: 'Task 2', done: false },
        { title: 'Task 3', done: false },
        { title: 'Task 5', done: false },
        { title: 'Task 6', done: false },
        { title: 'Task 7', done: false },
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
