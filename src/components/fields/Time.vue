<template>
  <div>
    <v-menu
      :ref="field.field"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="form[field.field]"
          :label="field.title"
          readonly
          outlined
          dense
          persistent-hint
          append-icon="mdi-clock-outline"
          prepend-icon=""
          v-bind="attrs"
          v-on="on"
          :hint="field.hint"
          :rules="rules[field.field]"
          hide-details
        ></v-text-field>
      </template>
      <v-time-picker
        @input="[fieldChanged(field, $event), (menu = false)]"
        :value="form[field.field]"
        @click:minute="menu = false"
        format="24hr"
        v-bind="dynamicProps"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form", "dynamicProps"],

  mounted() {
    this.$emit("mounted");
  },

  data() {
    return {
      time: null,
      menu: false,
    };
  },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
  },
};
</script>

<style></style>
