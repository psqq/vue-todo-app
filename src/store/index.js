import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import id from 'shortid';
import { cloneDeep, merge } from 'lodash';

Vue.use(Vuex);

/**
 * Создание новой заметки
 * @param {string} title 
 * @param {{ title: string, done: boolean }[]} todo 
 */
function createNote(title = '', todo = []) {
  return {
    id: id(),
    title,
    todo,
  };
}

/**
 * Начальное состояние хранилища
 */
function initialState() {
  return {
    notes: [],
    note: null,
  };
}

export default new Vuex.Store({
  state: {
    ...initialState(),
    // Несколько записей для тестирования
    notes: [
      createNote('Create this app', [
        { title: 'Create home page', done: false },
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
    // Текущая заметка для редактирования
    note: null,
    // История заметок.
    history: [],
    // Текущее положение в истории. Отмена -1. Возврат +1.
    historyIndex: 0,
  },
  mutations: {
    // Создание новой заметки
    createEmptyNote(state) {
      state.note = createNote();
      this.commit('resetHistory');
    },
    // Открытие заметки с заданным ид
    open(state, { id }) {
      state.note = cloneDeep(state.notes.find(x => x.id === id));
      this.commit('resetHistory');
    },
    // Добавление текущего состояния заметки в историю
    addToHistory(state, payload) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history[++state.historyIndex] = cloneDeep(payload);
    },
    // Сброс истории
    resetHistory(state) {
      state.history = [cloneDeep(state.note)];
      state.historyIndex = 0;
    },
    // Удаление заметки
    deleteNote(state, payload) {
      state.notes = state.notes.filter(x => x.id != payload.id);
    },
    // Установка заголовка для заметки
    setTitle(state, payload) {
      state.note.title = payload.title;
      this.commit('addToHistory', state.note);
    },
    // Установка списка задач для заметки
    setTodo(state, payload) {
      state.note.todo = cloneDeep(payload.todo);
      this.commit('addToHistory', state.note);
    },
    // Сохранения текущего состояния заметки в notes или добавления новой заметки,
    // если ее еще там нет
    saveOrCreateNew(state) {
      const note = state.notes.find(x => x.id === state.note.id);
      if (note) {
        merge(note, state.note);
      } else {
        state.notes.push(state.note);
      }
    },
    // Отмена всех изменения в текущем окне заметки.
    // Если заметка есть в notes, то берем ее состояние от туда.
    // Если нет, то обнуляем до новой заметки.
    // В конце сбрасываем историю.
    undoAllChanges(state) {
      const note = state.notes.find(x => x.id === state.note.id);
      if (note) {
        state.note = note;
      } else {
        state.note = createNote();
      }
      this.commit('resetHistory');
    },
    // Отмена одного изменения. Переход на один шаг назад в истории изменений
    undo(state) {
      if (state.historyIndex > 0) {
        state.note = cloneDeep(state.history[--state.historyIndex]);
      }
    },
    // Восстановление отмены. Переход на один шаг вперед в истории изменений
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
  // Плагин для сохранения состояния в localStorage
  plugins: [createPersistedState()],
});
