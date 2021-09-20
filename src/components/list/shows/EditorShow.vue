<template>
  <td class="pa-2" style="width: 100%">
    <span class="col-12 overflow-hidden">
      <div
        class="ck-content"
        v-html="value && 'value' in value ? value.value : ''"
      ></div>
    </span>
  </td>
</template>

<script>
export default {};
</script>

<style></style>
