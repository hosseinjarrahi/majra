<template>
  <div class="mb-5">
    <div>{{ field.title }}</div>
    <v-text-field
      dense
      :value="valueForRules"
      :rules="rules[field.field]"
      :hint="field.hint"
      outlined
      v-show="false"
    />
    <Map
      :value="form[field.field]"
      @input="fieldChanged(field, $event)"
      v-bind="field.props"
    />
  </div>
</template>

<script>
import Map from "./../utilities/Map";
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form"],

  components: { Map },

  mounted() {
    this.$emit("mounted");
  },

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