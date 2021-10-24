<template>
  <v-autocomplete
    :value="getValues(value)"
    @input="
      $majra.hasChild(field) ? parentChanged($event) : updateField($event)
    "
    :items="items"
    :rules="rules[field.field]"
    :loading="!!loading[field.rel.model]"
    :readonly="getProp('readonly', false) || disabled"
    v-bind="{ ...defaultProps, ...getProp('*', {}) }"
    v-on="getFromField('events', {})"
  />
</template>

<script>
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  mounted() {
    this._listen("callParentChanged", () => {
      if (this.$majra.hasChild(this.field)) {
        this.parentChanged(this.value, true);
      }
    });

    let autoSelect = false;

    autoSelect &&
      (function () {
        if (
          !this.loading[this.field.rel.model] &&
          !this.$majra.hasChild(this.field) &&
          Array.isArray(this.items) &&
          this.items.length > 0
        ) {
          let item = this.items[0][this.getProp("item-value")];
          this.updateField(this.getProp("multiple") ? [item] : item);
        }

        if (this.field.values) {
          let item = this.field.values[0]?.value;
          this.updateField(this.getProp("multiple") ? [item] : item);
        }
      })();

    this.$emit("mounted");
  },

  data() {
    return {
      defaultProps: {
        dense: true,
        outlined: true,
        "hide-details": true,
        label: this.field.title,
      },
    };
  },

  computed: {
    ...mapGetters({
      getItemsWithKey: "dynamic/getItemsWithKey",
      loading: "dynamic/loading",
      rules: "dynamic/rules",
    }),

    disabled() {
      if (!this.field.needFilter) return false;
      return Array.isArray(this.filters[this.field.rel.model])
        ? !this.filters[this.field.rel.model].length
        : true;
    },

    items() {
      if (this.field.values) return this.field.values;

      if (this.field.rel) {
        if (this.field.needFilter) {
          return this.filters[this.field.rel.model];
        }
        return "withChange" in this.field.rel
          ? this.field.rel.withChange(
              this.getItemsWithKey(this.field.rel.model),
              this
            )
          : this.getItemsWithKey(this.field.rel.model);
      }

      return [];
    },
  },

  methods: {
    getValues(values) {
      if (this.$helpers.isArrayOfObjects(values)) {
        return values.map((value) => value[this.getProp("item-value")]);
      }
      return values;
    },
  },
};
</script>

<style>
.v-input {
  padding: 0 !important;
}
</style>
