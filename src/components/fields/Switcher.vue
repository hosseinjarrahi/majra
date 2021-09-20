<template>
  <div>
    <v-switch
      class="ma-0"
      :input-value="form[field.field]"
      @change="fieldChanged(field, $event)"
      :label="field.title"
      :hint="field.hint"
      :rules="rules[field.field]"
      v-bind="dynamicProps"
    ></v-switch>
  </div>
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

<style></style>
