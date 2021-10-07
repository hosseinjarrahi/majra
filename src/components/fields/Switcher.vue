<template>
  <div>
    <v-switch
      :input-value="form[field.field]"
      @change="fieldChanged(field, $event)"
      :rules="rules[field.field]"
      v-bind="{ ...defaultProps, ...getProp('*', {}) }"
      v-on="getFromField('events', {})"
    ></v-switch>
  </div>
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
        class: "ma-0",
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
