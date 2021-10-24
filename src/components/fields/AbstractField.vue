<script>
export default {
  name: "AbstractField",

  props: [
    "updateField",
    "parentChanged",
    "field",
    "fields",
    "form",
    "filters",
    "index",
    "getProp",
    "getFromField",
    "value",
  ],

  mounted() {
    this.$emit("mounted");
  },
};
</script>
