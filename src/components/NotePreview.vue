<template>
  <div class="hello">
    <h3>{{ note.title }}</h3>
    <ul>
      <li
        v-for="(task, index) in previewTodo"
        :key="index"
      >{{ task.title }}</li>
      <li v-if="isMore">...</li>
    </ul>
    <button @click="open()">Open</button>
    <button @click="deleteNote()">Delete</button>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "NotePreview",
  props: ["note"],
  data() {
    return {
      maxTasks: 2
    };
  },
  computed: {
    previewTodo() {
      return this.note.todo.slice(0, this.maxTasks);
    },
    isMore() {
      return this.note.todo.length > this.maxTasks;
    }
  },
  methods: {
    ...Vuex.mapMutations(["delete"]),
    open() {
      this.$router.push("/note/" + this.note.id);
    },
    deleteNote() {
      const id = this.note.id;
      const yesNo = confirm("Вы уверены что хотите удалить заметку?");
      if (yesNo) {
        this.delete({ id });
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
