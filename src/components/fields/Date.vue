<template>
  <div>
    <v-text-field
      @click="clickTo(field.field)"
      outlined
      :value="
        Array.isArray(form[field.field])
          ? this.$helpers.persianDate(form[field.field][0]) +
            '~' +
            this.$helpers.persianDate(form[field.field][1])
          : this.$helpers.persianDate(form[field.field])
      "
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

  mounted() {
    this.$emit("mounted");
  },

  data() {
    return {
      menu: false,
      props: {},
      dialog: false,
      defaultProps: {
        class: "custom-date",
        format: "YYYY/MM/DD",
      },
    };
  },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
    }),
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
