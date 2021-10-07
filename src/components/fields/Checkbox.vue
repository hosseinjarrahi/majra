<template>
  <div>
    <v-checkbox
      @change="fieldChanged(field, $event)"
      :rules="rules[field.field]"
      v-bind="{ ...defaultProps, ...getProp('*', {}) }"
      v-on="getFromField('events', {})"
    ></v-checkbox>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
  },

  mounted() {
    this.$emit("mounted");
  },

  data() {
    return {
      defaultProps: {
        dense: true,
        label: this.field.title,
        "hide-details": true,
      },
    };
  },
};
</script>
