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

      let text = this.$helpers.getSafe(this.field, "props.item-text", "text");
      let value = this.$helpers.getSafe(
        this.field,
        "props.item-value",
        "value"
      );
      if (this.field.values) {
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
          ? this.getValues(this.item, text)
          : this.item[text]
        : this.item;
    },
  },

  methods: {
    getValues(values, text) {
      if (this.$helpers.isArrayOfObjects(values)) {
        return values.map((value) => value[text]).join(" , ");
      }
      return values.join(",");
    },
  },
};
</script>
