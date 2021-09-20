<template>
  <div>
    {{ persianDate(item) }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["show", "item"],
  computed: {
    ...mapGetters({
      persianDate: "dynamic/persianDate",
    }),
  },
};
</script>

<style></style>
