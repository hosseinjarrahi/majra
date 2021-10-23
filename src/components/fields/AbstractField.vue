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
  ],

  mounted() {
    this.$emit("mounted");
  },
};
</script>
