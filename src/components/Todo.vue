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
        @change="changed()"
      >
      <input
        type="text"
        v-model="tasksTitles[index]"
        @change="changed()"
      >
      <button @click="deleteTask(index)">Delete</button>
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
    return { checkedTasks: [], tasksTitles: [] };
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
    },
    deleteTask(index) {
      this.checkedTasks = this.checkedTasks.filter(x => x != index);
      this.tasksTitles.splice(index, 1);
      this.changed();
    }
  },
  watch: {
    todo: {
      handler(todo) {
        this.checkedTasks = todo
          .map((x, i) => x.done && i)
          .filter(x => x != null);
        this.tasksTitles = todo.map(x => x.title);
      },
      immediate: true
    }
  }
};
</script>
