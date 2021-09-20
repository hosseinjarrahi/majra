<template>
  <div class="d-flex flex-row align-center">
    <v-btn @click="dialog = true" icon v-if="limitedFiles.length">
      <v-icon size="18">fal fa-paperclip</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["item"],

  created() {
    this.files = Array.isArray(this.item) ? this.item : [this.item];
  },

  data() {
    return {
      files: [],
    };
  },

  computed: {
    ...mapGetters({
      isImage: "dynamic/isImage",
    }),
    limitedFiles() {
      return this.files
        .filter((file) => !!file && file != "null")
        .filter((index) => index < 2);
    },
  },
};
</script>

<style></style>
