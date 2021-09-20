<template>
  <div>
    <v-autocomplete
      :value="getValues(form[field.field], field)"
      :multiple="'multiple' in field ? field.multiple : false"
      @input="
        field.childHasFilter
          ? parentChanged(field, $event)
          : fieldChanged(field, $event)
      "
      dense
      outlined
      :item-text="field.item_text"
      :item-value="field.item_value"
      :items="items"
      :disabled="field.disabled"
      :label="field.title"
      :loading="!!loading[field.rel.model]"
      :readonly="field.readonly || disabled"
      :hint="field.hint"
      :rules="rules[field.field]"
      v-bind="dynamicProps"
      hide-details
      auto-select-first
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: [
    "fieldChanged",
    "parentChanged",
    "field",
    "form",
    "filters",
    "dynamicProps",
  ],

  mounted() {
    this._listen("callParentChanged", () => {
      if (this.field.childHasFilter) {
        this.parentChanged(this.field, this.form[this.field.field], true);
      }
    });

    if (
      !this.loading[this.field.rel.model] &&
      !this.field.childHasFilter &&
      Array.isArray(this.items) &&
      this.items.length > 0
    ) {
      let item = this.items[0][this.field.item_value];
      this.fieldChanged(this.field, this.field.multiple ? [item] : item);
    }

    if (this.field.values) {
      let item = this.field.values[0]?.value;
      this.fieldChanged(this.field, this.field.multiple ? [item] : item);
    }

    this.$emit("mounted");
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
    getValues(values, field) {
      if (this.isArrayOfObjects(values)) {
        return values.map((value) => value[field.item_value]);
      }
      return values;
    },

    isArrayOfObjects(values) {
      return (
        Array.isArray(values) &&
        values.length > 0 &&
        typeof values[0] === "object"
      );
    },
  },
};
</script>

<style>
.v-input {
  padding: 0 !important;
}
</style>
