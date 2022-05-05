<template>
  <div>
    <v-text-field
      @click="clickTo(field.field)"
      outlined
      :value="result"
      :label="field.title"
      readonly
      persistent-hint
      append-icon="mdi-calendar-outline"
      prepend-icon=""
      dense
      clearable
      hide-details
      :hint="field.hint"
      :rules="rules[field.field]"
    ></v-text-field>
    <date-picker
      :ref="'date' + field.field"
      @input="updateField($event)"
      :value="value"
      v-bind="{ ...defaultProps, ...getProp('*', {}) }"
      v-on="getFromField('events', {})"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  components: { DatePicker: VuePersianDatetimePicker },

  data() {
    return {
      defaultProps: {
        class: "custom-date",
        format: "YYYY/MM/DD",
        type: "date",
      },
    };
  },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
    result() {
      return Array.isArray(this.value)
        ? this.$helpers.persianDate(
            this.value[0],
            this.getProp("type", "date")
          ) +
            " ~ " +
            this.$helpers.persianDate(
              this.value[1],
              this.getProp("type", "date")
            )
        : this.$helpers.persianDate(this.value, this.getProp("type", "date"));
    },
  },

  methods: {
    clickTo(field) {
      if (this.field.readonly) return;

      this.$refs["date" + field].$el.children[0].children[0].click();
    },
  },
};
</script>

<style>
.custom-date .vpd-input-group {
  display: none !important;
}
</style>
