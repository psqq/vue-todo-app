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
  </div>
</template>

<script>
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
  }
};
</script>

<style scoped lang="scss">
</style>
