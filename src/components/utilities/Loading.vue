<template>
  <v-overlay z-index="500" :value="loading">
    <v-icon class="mx-auto">mdi-loading mdi-spin</v-icon>
  </v-overlay>
</template>

<script>
export default {
  created() {
    this._listen("loading", (loading) => {
      this.loading = loading;
    });
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style></style>
