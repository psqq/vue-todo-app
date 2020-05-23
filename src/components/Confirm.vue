<template>
  <Modal>
    <template v-slot:header>
      <h3>{{ title }}</h3>
    </template>
    <template v-slot:body>
      <p>
        {{ body }}
      </p>
    </template>
    <template v-slot:footer>
      <button @click="$emit('yes')">Yes</button>
      <button @click="$emit('no')">No</button>
      <button @click="$emit('close')">Close</button>
    </template>
  </Modal>
</template>

<script>
import Vuex from "vuex";
import Modal from "./Modal";

export default {
  name: "Confirm",
  components: {
    Modal
  },
  props: ["title", "body"]
};
</script>

<style scoped lang="scss">
</style>
