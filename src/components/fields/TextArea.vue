<template>
  <v-textarea
    @input="fieldChanged(field, $event)"
    :value="form[field.field]"
    :rules="rules[field.field]"
    v-bind="{ ...defaultProps, ...getProp('*', {}) }"
    v-on="getFromField('events', {})"
  />
</template>

<script>
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  mounted() {
    this.$emit("mounted");
  },

  data() {
    return {
      defaultProps: {
        rows: "2",
        dense: true,
        outline: true,
        outlined: true,
        "hide-details": true,
        label: this.field.title,
      },
    };
  },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
  },
};
</script>
