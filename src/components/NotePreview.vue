<template>
  <div class="note-preview">
    <h3>{{ note.title }}</h3>
    <ul>
      <li
        v-for="(task, index) in previewTodo"
        :key="index"
        :style="{textDecoration: task.done ? 'line-through' : 'none'}"
      >
        {{ task.title }}
      </li>
      <li v-if="isMore">...</li>
    </ul>
    <button @click="open()">Open</button>
    <button @click="showConfirm = true">Delete</button>
    <Confirm
      v-if="showConfirm"
      title="Are you sure you want to delete the note?"
      body="This action cannot be undone!"
      @yes="deleteNote({ id: note.id }), showConfirm = false"
      @no="showConfirm = false"
      @close="showConfirm = false"
    />
  </div>
</template>

<script>
import Vuex from "vuex";
import Confirm from "./Confirm";

export default {
  name: "NotePreview",
  components: {
    Confirm
  },
  props: ["note"],
  data() {
    return {
      maxTasks: 2,
      showConfirm: false
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
    ...Vuex.mapMutations(["deleteNote"]),
    open() {
      this.$router.push("/note/" + this.note.id);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
