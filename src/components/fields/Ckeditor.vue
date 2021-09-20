<template>
  <div class="mb-2">
    <span>{{ field.title }}</span>
    <editor @input="fieldChanged(field, $event)" :value="form[field.field]" />
  </div>
</template>

<script>
import Editor from "@/components/utilities/Editor.vue";

export default {
  components: { Editor },

  props: ["fieldChanged", "field", "form", "index"],

  mounted() {
    this.$emit("mounted");
  },
};
</script>
