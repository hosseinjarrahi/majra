<template>
  <fieldset
    class="color-mamad rounded-lg col-12 px-3 mb-4 py-3"
    style="border-width: 1px"
  >
    <legend class="px-2">{{ label }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  props: ["label", "py"],
};
</script>

<style scoped>
.color-mamad {
  background: #fafafa5e;
}
.v-input--selection-controls {
  margin-top: 0px;
}
</style>
