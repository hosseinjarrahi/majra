<template>
  <div class="col-12 overflow-hidden">
    <div
      class="ck-content"
      v-html="value && 'value' in value ? value.value : ''"
    ></div>
  </div>
</template>

<script>
export default {};
</script>
