<template>
  <v-menu :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        :color="form[field.field] ? form[field.field] : 'primary'"
        dark
        max-height="35"
        v-bind="attrs"
        class="col-12"
        v-on="on"
      >
        {{ field.title }}
      </v-btn>
    </template>
    <v-color-picker
      dot-size="25"
      @input="fieldChanged(field, $event)"
      swatches-max-height="200"
      dense
      :value="form[field.field]"
      v-bind="field.props"
    />
  </v-menu>
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
