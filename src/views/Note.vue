<template>
  <div class="about">
    <!-- Для быстрого перехода к списку заметок -->
    <p>
      <router-link to="/">Main page</router-link>
    </p>
    <!-- Кнопки для работы с заметками -->
    <p>
      <button @click="saveChanges()">Save changes</button>
      <button @click="showUndoAllConfirm = true">Undo all changes</button>
      <button @click="showDeleteConfirm = true">Delete</button>
    </p>
    <p>
      <button @click="undo()">Undo</button>
      <button @click="redo()">Redo</button>
    </p>
    <!-- Вывод информации о заметки -->
    Title: <input
      type="text"
      v-model="title"
    >
    <h3>{{ note.title }}</h3>
    Todo:
    <Todo v-model="todo" />
    <!-- Диалоговые окна для подтвержения изменений -->
    <Confirm
      v-if="showDeleteConfirm"
      title="Are you sure you want to delete the note?"
      body="This action cannot be undone!"
      @yes="deleteThisNote()"
      @no="showDeleteConfirm = false"
      @close="showDeleteConfirm = false"
    />
    <Confirm
      v-if="showUndoAllConfirm"
      title="Are you sure you want to discard all changes?"
      body="This action cannot be undone!"
      @yes="undoAllChanges(), showUndoAllConfirm = false"
      @no="showUndoAllConfirm = false"
      @close="showUndoAllConfirm = false"
    />
  </div>
</template>

<script>
import Vuex from "vuex";
import Todo from "../components/Todo";
import Confirm from "../components/Confirm";

/**
 * Страница одной заметки.
 */
export default {
  name: "Note",
  components: {
    Todo,
    Confirm
  },
  // В качестве параметра в компонент передается ид заметки
  props: ["id"],
  data() {
    return {
      // У правляет отображением модального окна
      // ... удаления заметки
      showDeleteConfirm: false,
      // ... подтвержения отмены всех изменений
      showUndoAllConfirm: false
    };
  },
  /**
   * Методы для получения и сохранения информации о заметки: заголовок и список задач
   */
  computed: {
    ...Vuex.mapState(["note"]),
    title: {
      get() {
        return this.note.title;
      },
      set(title) {
        this.setTitle({ title });
      }
    },
    todo: {
      get() {
        return this.note.todo;
      },
      set(todo) {
        this.setTodo({ todo });
      }
    }
  },
  /**
   * Методы для изменения заметок
   */
  methods: {
    ...Vuex.mapMutations([
      "open",
      "createEmptyNote",
      "setTitle",
      "saveOrCreateNew",
      "setTodo",
      "undoAllChanges",
      "deleteNote",
      "undo",
      "redo"
    ]),
    saveChanges() {
      this.saveOrCreateNew();
    },
    /**
     * Удаление данной заметки и переход обратно к списку всех заметок
     */
    deleteThisNote() {
      const id = this.note.id;
      this.deleteNote({ id });
      this.showDeleteConfirm = false;
      this.$router.push("/");
    }
  },
  /**
   * Во время создания компонента ему передается ид заметки.
   * На случай ввода пользователем ид в адресную строку вручную
   * необходимо наблюдение за параметром ид.
   */
  watch: {
    id: {
      handler(id) {
        if (id) {
          this.open({ id });
          if (!this.note) {
            this.$router.push("/");
          }
        } else {
          this.createEmptyNote();
        }
      },
      immediate: true
    }
  }
};
</script>
 