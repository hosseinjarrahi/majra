<template>
  <v-text-field
    @input="fieldChanged(field, $event)"
    :value="form[field.field]"
    @keypress.prevent.enter="_event('saveForm')"
    :rules="rules[field.field]"
    v-bind="{ ...defaultProps, ...getProp('*', {}) }"
    v-on="getFromField('events', {})"
  />
</template>

<script>
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  data() {
    return {
      defaultProps: {
        dense: true,
        outlined: true,
        "hide-details": true,
        label: this.field.title,
        autofocus: this.index === 0,
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
