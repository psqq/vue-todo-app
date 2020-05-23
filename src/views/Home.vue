<template>
  <div>
    <h1>Главная</h1>
    <button @click="newNote()">Создать новую заметку</button>
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

export default {
  name: "Home",
  computed: {
    ...Vuex.mapState(["notes"])
  },
  components: {
    NotePreview
  },
  methods: {
    newNote() {
      this.$router.push("/note/");
    }
  }
};
</script>
