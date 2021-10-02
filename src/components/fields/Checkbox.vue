<template>
  <div>
    <v-checkbox
      @change="fieldChanged(field, $event)"
      :label="field.title"
      dense
      :hint="field.hint"
      :rules="rules[field.field]"
      v-bind="field.props"
    ></v-checkbox>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form"],

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
  },

  mounted() {
    this.$emit("mounted");
  },
};
</script>
