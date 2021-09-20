<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        small
        fab
        @click="$emit('input', !value)"
        style="position: absolute; bottom: 7px; right: 55px; z-index: 1000"
      >
        <v-icon>fal fa-cog</v-icon>
      </v-btn>
    </template>
    <span>اندازه گیری</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style></style>
