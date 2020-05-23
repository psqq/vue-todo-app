import Vue from 'vue';
import Vuex from 'vuex';
import id from 'shortid';
import { cloneDeep, merge } from 'lodash';

Vue.use(Vuex);

function createNote(title = '', todo = []) {
  return {
    id: id(),
    title,
    todo,
  };
}

function initialState() {
  return {
    notes: [],
    note: null,
  };
}

export default new Vuex.Store({
  state: {
    ...initialState(),
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
    emptyState() {
      this.replaceState({ ...initialState() });
    },
    createEmptyNote(state) {
      state.note = createNote();
    },
    open(state, payload) {
      state.note = cloneDeep(state.notes.find(x => x.id === payload.id));
    },
    delete(state, payload) {
      state.notes = state.notes.filter(x => x.id != payload.id);
    },
    setTitle(state, payload) {
      state.note.title = payload.title;
    },
    saveOrCreateNew(state) {
      const note = state.notes.find(x => x.id === state.note.id);
      if (note) {
        merge(note, state.note);
      } else {
        state.notes.push(state.note);
      }
    }
  },
  actions: {
  },
  modules: {
  },
});
