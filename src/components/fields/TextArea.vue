<template>
  <v-textarea
    @input="updateField($event)"
    :value="value"
    v-bind="{ ...defaultProps, ...getProp('*', {}) }"
    v-on="getFromField('events', {})"
  />
</template>

<script>
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

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
