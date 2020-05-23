<template>
  <div class="about">
    <p>
      <router-link to="/">Main page</router-link>
    </p>
    <button @click="saveChanges()">Save changes</button>
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
      "setTodo"
    ]),
    saveChanges() {
      this.saveOrCreateNew();
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
 