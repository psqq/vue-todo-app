<template>
  <div class="hello">
    <h3>{{ note.title }}</h3>
    <ul>
      <li
        v-for="(task, index) in note.todo"
        :key="index"
      >{{ task.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["note"]
};
</script>

<style scoped lang="scss">
</style>
