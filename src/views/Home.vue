<template>
  <div>
    <h1>All notes</h1>
    <button @click="newNote()">Create new note</button>
    <div>
      <NotePreview
        v-for="(note, index) in notes"
        :note="note"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import NotePreview from "../components/NotePreview";

/**
 * Компонент который позволяет просмотривать список всех заметок.
 * А также их создавать и редактировать.
 */
export default {
  name: "Home",
  components: {
    NotePreview
  },
  computed: {
    ...Vuex.mapState(["notes"])
  },
  methods: {
    newNote() {
      this.$router.push("/note/");
    }
  }
};
</script>
