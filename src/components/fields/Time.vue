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
        v-bind="{ ...defaultProps, ...getProp('*', {}) }"
        v-on="getFromField('events', {})"
      ></v-time-picker>
    </v-menu>
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
      time: null,
      menu: false,
      defaultProps: {
        format: "24hr",
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
