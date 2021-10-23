<template>
  <div>
    {{ form[field.field] }}
    <v-combobox
      :value="getValues(form[field.field])"
      @input="updateField($event)"
      :rules="rules[field.field]"
      :items="items"
      v-bind="{ ...defaultProps, ...getProp('*', {}) }"
      v-on="getFromField('events', {})"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  data() {
    return {
      defaultProps: {
        chips: true,
        dense: true,
        outlined: true,
        label: this.field.title,
        "hide-details": true,
        clearable: true,
      },
    };
  },

  computed: {
    ...mapGetters({
      getItemsWithKey: "dynamic/getItemsWithKey",
      rules: "dynamic/rules",
    }),

    disabled() {
      if (!this.field.needFilter) return false;
      return Array.isArray(this.filters[this.field.rel.model])
        ? !this.filters[this.field.rel.model].length
        : true;
    },

    items() {
      return this.field.values
        ? this.field.values
        : this.field.rel
        ? !this.field.needFilter
          ? "withChange" in this.field.rel
            ? this.field.rel.withChange(
                this.getItemsWithKey(this.field.rel.model),
                this
              )
            : this.getItemsWithKey(this.field.rel.model)
          : this.filters[this.field.rel.model]
        : [];
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
