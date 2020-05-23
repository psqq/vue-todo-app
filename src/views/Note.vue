<template>
  <div class="about">
    <p>
      <router-link to="/">Main page</router-link>
    </p>
    <p>
      <button @click="saveChanges()">Save changes</button>
      <button @click="showUndoAllConfirm = true">Undo all changes</button>
      <button @click="showDeleteConfirm = true">Delete</button>
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

export default {
  name: "Note",
  components: {
    Todo,
    Confirm
  },
  data() {
    return {
      showDeleteConfirm: false,
      showUndoAllConfirm: false
    };
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
    deleteThisNote() {
      const id = this.note.id;
      this.deleteNote({ id });
      this.showDeleteConfirm = false;
      this.$router.push("/");
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
 