<script>
export default {
  name: "AbstractField",

  props: [
    "fieldChanged",
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
