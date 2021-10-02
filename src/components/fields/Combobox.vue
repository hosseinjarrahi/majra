<template>
  <div>
    {{ form[field.field] }}
    <v-combobox
      :multiple="field.multiple"
      :value="getValues(form[field.field], field)"
      :item-text="field.item_text"
      :item-value="field.item_value"
      :items="items"
      chips
      @input="[fieldChanged(field, $event)]"
      dense
      outlined
      class="mamad-combo"
      :label="field.title"
      :hint="field.hint"
      :rules="rules[field.field]"
      v-bind="field.props"
      hide-details
      clearable
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form", "filters", "fields"],

  mounted() {
    this.$emit("mounted");
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
    getValues(values, field) {
      if (this.$helpers.isArrayOfObjects(values)) {
        return values.map((value) => value[field.item_value]);
      }
      return values;
    },
  },
};
</script>
