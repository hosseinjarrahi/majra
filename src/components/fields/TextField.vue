<template>
  <v-text-field
    dense
    @input="fieldChanged(field, $event)"
    :value="form[field.field]"
    :label="field.title"
    :rules="rules[field.field]"
    :hint="field.hint"
    :autofocus="index == 0"
    outlined
    :readonly="field.readonly"
    v-bind="field.props"
    hide-details
    @keypress.prevent.enter="_event('saveForm')"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form", "index"],

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

<style>
.v-input {
  font-size: 10pt !important;
}
.v-input label[for] {
  font-size: 10pt;
}
.v-text-field--filled.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot,
.v-text-field--filled.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot,
.v-text-field--filled.v-input--dense.v-text-field--outlined.v-text-field--filled
  > .v-input__control
  > .v-input__slot,
.v-text-field--full-width.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot,
.v-text-field--full-width.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot,
.v-text-field--full-width.v-input--dense.v-text-field--outlined.v-text-field--filled
  > .v-input__control
  > .v-input__slot,
.v-text-field--outlined.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot,
.v-text-field--outlined.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot,
.v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled
  > .v-input__control
  > .v-input__slot {
  min-height: 35px;
}
.v-text-field--outlined.v-input--dense .v-label {
  top: 7px;
}
.v-messages {
  font-size: 10px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 6px;
}
.v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__prepend-outer,
.v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__prepend-inner,
.v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__append-inner,
.v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__append-outer,
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__prepend-outer,
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__prepend-inner,
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__append-inner,
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__append-outer {
  margin-top: 6px;
}
</style>
