<template>
  <div>
    <v-text-field
      @click="clickTo(field.field)"
      outlined
      :value="
        typeof form[field.field] == 'object'
          ? persianDate(form[field.field][0]) +
            '~' +
            persianDate(form[field.field][1])
          : persianDate(form[field.field])
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
      v-bind="{ ...field.props, ...dynamicProps }"
      :ref="'date' + field.field"
      class="mamad"
      @input="fieldChanged(field, $event)"
      :value="form[field.field]"
      :format="field.format ? field.format : 'YYYY/MM/DD'"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  props: ["fieldChanged", "field", "form", "dynamicProps"],

  components: { DatePicker: VuePersianDatetimePicker },

  mounted() {
    this.$emit("mounted");
  },

  data() {
    return {
      menu: false,
      props: {},
      dialog: false,
    };
  },

  computed: {
    ...mapGetters({
      persianDate: "dynamic/persianDate",
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
.mamad .vpd-input-group {
  display: none !important;
}
</style>
