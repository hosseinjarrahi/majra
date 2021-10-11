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
      hide-details
      :hint="field.hint"
      :rules="rules[field.field]"
    ></v-text-field>
    <date-picker
      :ref="'date' + field.field"
      @input="fieldChanged(field, $event)"
      :value="form[field.field]"
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
      menu: false,
      props: {},
      dialog: false,
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
      if (this.field.dateShow) {
        return this.field.dateShow(this.form[this.field.field]);
      }
      return Array.isArray(this.form[this.field.field])
        ? this.$helpers.persianDate(this.form[this.field.field][0], this.type) +
            " ~ " +
            this.$helpers.persianDate(this.form[this.field.field][1], this.type)
        : this.$helpers.persianDate(this.form[this.field.field], this.type);
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
