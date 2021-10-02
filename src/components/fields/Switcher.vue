<template>
  <div>
    <v-switch
      class="ma-0"
      :input-value="form[field.field]"
      @change="fieldChanged(field, $event)"
      :label="field.title"
      :hint="field.hint"
      :rules="rules[field.field]"
      v-bind="field.props"
    ></v-switch>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form"],

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