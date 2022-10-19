<template>
  <div>
    <v-switch
      :input-value="value"
      @change="updateField($event)"
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
