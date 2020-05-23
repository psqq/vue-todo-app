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
    history: [],
    historyIndex: 0,
    note: null,
  },
  mutations: {
    emptyState(state) {
      this.replaceState({ ...initialState(), notes: state.notes, note: state.note });
    },
    createEmptyNote(state) {
      state.note = createNote();
      this.commit('addToHistory', state.note);
    },
    open(state, payload) {
      state.note = cloneDeep(state.notes.find(x => x.id === payload.id));
      this.commit('resetHistory');
    },
    addToHistory(state, payload) {
      state.history[++state.historyIndex] = cloneDeep(payload);
    },
    resetHistory(state) {
      state.history = [cloneDeep(state.note)];
      state.historyIndex = 0;
    },
    delete(state, payload) {
      state.notes = state.notes.filter(x => x.id != payload.id);
    },
    setTitle(state, payload) {
      state.note.title = payload.title;
      this.commit('addToHistory', state.note);
    },
    setTodo(state, payload) {
      state.note.todo = cloneDeep(payload.todo);
      this.commit('addToHistory', state.note);
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
        state.note = note;
      } else {
        state.note = createNote();
      }
      this.commit('resetHistory');
    },
    undo(state) {
      if (state.historyIndex > 0) {
        state.note = cloneDeep(state.history[--state.historyIndex]);
      }
    },
    redo(state) {
      if (state.historyIndex < state.history.length - 1) {
        state.note = cloneDeep(state.history[++state.historyIndex]);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
