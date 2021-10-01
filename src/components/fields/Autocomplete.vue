<template>
  <div>
    <v-autocomplete
      :value="getValues(form[field.field], field)"
      :multiple="'multiple' in field ? field.multiple : false"
      @input="
        $majra.hasChild(field)
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
      if (this.$majra.hasChild(this.field)) {
        this.parentChanged(this.field, this.form[this.field.field], true);
      }
    });

    if (
      !this.loading[this.field.rel.model] &&
      !this.$majra.hasChild(this.field) &&
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
    getValues(values, field) {
      if (this.$helpers.isArrayOfObjects(values)) {
        return values.map((value) => value[field.item_value]);
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
