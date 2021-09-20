<template>
  <td class="col-12" colspan="3">
    <span class="content" v-html="getValue(value)" />
  </td>
</template>

<script>
export default {
  props: ["getFiles", "openImage", "value", "getValue"],
};
</script>

<style></style>
