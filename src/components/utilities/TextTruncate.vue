<template>
  <div v-text="out" style="cursor: pointer" @click="click = !click"></div>
</template>

<script>
export default {
  name: "TextTruncate",

  props: ["length", "words"],

  data() {
    return {
      click: false,
    };
  },

  computed: {
    out() {
      if (this.click) return this.words;
      return this.words.length > this.length
        ? this.words.substr(0, this.length) + " ... "
        : this.words;
    },
  },
};
</script>
