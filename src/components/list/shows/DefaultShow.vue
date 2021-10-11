<template>
  <span class="content" v-html="getValue(value)" />
</template>

<script>
export default {
  props: ["getFiles", "openImage", "value", "getValue"],
};
</script>
