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
    <ul>
      <li
        v-for="(task, index) in note.todo"
        :key="index"
      >{{ task.title }}</li>
    </ul>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "Note",
  computed: {
    ...Vuex.mapState(["note"]),
    title: {
      get() {
        return this.note.title;
      },
      set(title) {
        this.setTitle({ title });
      }
    }
  },
  methods: {
    ...Vuex.mapMutations([
      "open",
      "createEmptyNote",
      "setTitle",
      "saveOrCreateNew"
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
 