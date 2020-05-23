<template>
  <div class="about">
    <p>
      <router-link to="/">Main page</router-link>
    </p>
    <p>
      <button @click="saveChanges()">Save changes</button>
      <button @click="undoAllChangesWithConfirm()">Undo all changes</button>
      <button @click="deleteThisNote()">Delete</button>
    </p>
    <p>
      <button @click="undo()">Undo</button>
      <button @click="redo()">Redo</button>
    </p>
    Title: <input
      type="text"
      v-model="title"
    >
    <h3>{{ note.title }}</h3>
    Todo:
    <Todo v-model="todo" />
  </div>
</template>

<script>
import Vuex from "vuex";
import Todo from "../components/Todo";

export default {
  name: "Note",
  components: {
    Todo
  },
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
    undoAllChangesWithConfirm() {
      const yesNo = confirm("Действительно хотите отменить все изменения?");
      if (yesNo) {
        this.undoAllChanges();
      }
    },
    deleteThisNote() {
      const id = this.note.id;
      const yesNo = confirm("Вы уверены что хотите удалить заметку?");
      if (yesNo) {
        this.deleteNote({ id });
        this.$router.push("/");
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.open({ id });
      if (!this.note) {
        this.$router.push("/");
      }
    } else {
      this.createEmptyNote();
    }
  }
};
</script>
 