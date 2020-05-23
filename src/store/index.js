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
        { title: 'Create home page', done: true },
        { title: 'Create note page', done: true },
        { title: 'Create todo component', done: true },
      ]),
      createNote('Test note 1', [
        { title: 'Task 1', done: false },
        { title: 'Task 2', done: true },
        { title: 'Task 3', done: false },
        { title: 'Task 5', done: false },
        { title: 'Task 6', done: true },
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
    setTodo(state, payload) {
      state.note.todo = cloneDeep(payload.todo);
    },
    saveOrCreateNew(state) {
      const note = state.notes.find(x => x.id === state.note.id);
      if (note) {
        state.note = cloneDeep(state.note);
      } else {
        state.notes.push(state.note);
      }
    },
    undoAllChanges(state) {
      const note = state.notes.find(x => x.id === state.note.id);
      if (note) {

        console.log(JSON.parse(JSON.stringify(state.note)), JSON.parse(JSON.stringify(note)));
        state.note = note;
      } else {
        state.note = createNote();
      }
    }
  },
  actions: {
  },
  modules: {
  },
});
