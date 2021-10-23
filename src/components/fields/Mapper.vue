<template>
  <div class="mb-5">
    <div>{{ field.title }}</div>
    <v-text-field
      :value="valueForRules"
      :rules="rules[field.field]"
      v-show="false"
    />
    <Map
      :value="form[field.field]"
      @input="updateField($event)"
      v-bind="{ ...defaultProps, ...getProp('*', {}) }"
      v-on="getFromField('events', {})"
    />
  </div>
</template>

<script>
import Map from "./../utilities/Map";
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  components: { Map },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
    valueForRules() {
      if (
        Array.isArray(this.form[this.field.field]) &&
        this.form[this.field.field].length == 0
      ) {
        return "";
      }
      return this.form[this.field.field];
    },
  },
};
</script>
