<template>
  <ul>
    <li
      v-for="(task, index) in todo"
      :key="index"
    >
      <input
        type="checkbox"
        id="checkbox"
        :value="index"
        v-model="checkedTasks"
      >
      <input
        type="text"
        v-model="tasksTitles[index]"
      >
    </li>
    <li>
      <button @click="createNew()">Create new</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Todo",
  model: {
    prop: "todo",
    event: "change"
  },
  props: ["todo"],
  data() {
    return {
      checkedTasks: this.todo.map((x, i) => x.done && i).filter(x => x != null),
      tasksTitles: this.todo.map(x => x.title)
    };
  },
  computed: {},
  methods: {
    changed() {
      const todo = this.tasksTitles.map((x, i) => ({
        title: x,
        done: this.checkedTasks.includes(i)
      }));
      this.$emit("change", todo);
    },
    createNew() {
      this.tasksTitles.push("");
      this.changed();
    }
  },
  watch: {
    checkedTasks() {
      this.changed();
    },
    tasksTitles() {
      this.changed();
    }
  }
};
</script>
