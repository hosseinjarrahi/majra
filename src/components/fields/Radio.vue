<template>
  <div>
    <v-radio-group
      hide-details
      :value="form[field.field]"
      @change="fieldChanged(field, $event)"
    >
      <v-radio
        v-for="value in field.values"
        :key="value.value"
        :label="value.text"
        :value="value.value"
        v-bind="dynamicProps"
      >
      </v-radio>
    </v-radio-group>
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
