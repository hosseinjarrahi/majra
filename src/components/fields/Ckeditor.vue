<template>
  <div class="mb-2">
    <span>{{ field.title }}</span>
    <editor @input="updateField($event)" :value="value" />
  </div>
</template>

<script>
import Editor from "./../utilities/Editor.vue";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  components: { Editor },

  mounted() {
    this.$emit("mounted");
  },
};
</script>
