<template>
  <div>
    {{ $helpers.persianDate(item) }}
  </div>
</template>

<script>
export default {
  props: ["show", "item"],
};
</script>
