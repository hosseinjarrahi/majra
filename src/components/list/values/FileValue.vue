<template>
  <div class="d-flex flex-row align-center">
    <v-btn icon v-if="!field.isImage">
      <v-icon size="18">fal fa-paperclip</v-icon>
    </v-btn>
    <v-img
      v-else
      v-for="img in limitedFiles"
      :key="img"
      :src="img"
      height="30px"
      max-width="60px"
      contain
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["item", "field"],

  watch: {
    item: {
      immediate: true,
      handler(value) {
        if (!value) return (this.files = []);
        this.files = Array.isArray(value) ? value : [value];
      },
    },
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
      return this.files.map((file) => this.$majra.configs.BASE_URL + file);
    },
  },
};
</script>
