<template>
  <v-textarea
    :type="field.type"
    outlined
    dense
    @input="fieldChanged(field, $event)"
    :value="form[field.field]"
    :label="field.title"
    :hint="field.hint"
    :rules="rules[field.field]"
    rows="2"
    outline
    hide-details
    v-bind="dynamicProps"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form", "dynamicProps"],

  mounted() {
    this.$emit("mounted");
  },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
  },
};
</script>
