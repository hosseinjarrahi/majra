<template>
  <div>
    {{ result }}
  </div>
</template>

<script>
export default {
  props: ["field", "item"],

  computed: {
    result() {
      if (this.item == null) return;

      if (this.field.values) {
        let text = this.field.item_text ? this.field.item_text : "text";
        let value = this.field.item_value ? this.field.item_value : "value";
        let out = "";
        this.field.values.forEach((val) => {
          if (val[value] == this.item) {
            out = val[text];
          }
        });
        return out;
      }

      return typeof this.item === "object"
        ? Array.isArray(this.item)
          ? this.getValues(this.item, this.field)
          : this.item[this.field.item_text]
        : this.item;
    },
  },

  methods: {
    getValues(values, field) {
      if (this.isArrayOfObjects(values)) {
        return values.map((value) => value[field.item_text]).join(" , ");
      }
      return values.join(",");
    },
    isArrayOfObjects(values) {
      return values.length > 0 && typeof values[0] === "object";
    },
  },
};
</script>

<style></style>
