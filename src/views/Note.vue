<template>
  <div class="about">
    <p>
      <router-link to="/">Main page</router-link>
    </p>
    Title:
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
    ...Vuex.mapState(["note"])
  },
  methods: {
    ...Vuex.mapMutations(["open", "createEmptyNote"])
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.open({ id });
    } else {
      this.createEmptyNote();
    }
  }
};
</script>
