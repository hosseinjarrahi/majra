<template>
  <div class="mb-5">
    <div>{{ field.title }}</div>
    <v-text-field
      :value="valueForRules"
      :rules="rules[field.field]"
      v-show="false"
    />
    <Map
      :value="value"
      @input="updateField($event)"
      v-bind="getProp('*', {})"
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
      if (Array.isArray(this.value) && this.value.length == 0) {
        return "";
      }
      return this.value;
    },
  },
};
</script>
