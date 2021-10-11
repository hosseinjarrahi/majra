<template>
  <div>
    <v-row v-if="value.field.isImage">
      <v-col cols="12">
        <h3>{{ value.field.title }}</h3>
      </v-col>
      <v-col
        v-for="img in getFiles(value.value)"
        :key="img"
        cols="2"
        @click="openImage(img)"
      >
        <v-img style="cursor: pointer" :src="img" max-width="300" />
      </v-col>
    </v-row>
    <a v-else :href="f" v-for="f in getFiles(value.value)" :key="f"> دانلود </a>
  </div>
</template>

<script>
export default {
  props: ["getFiles", "openImage", "value", "item"],
  data: () => ({
    map: {
      jpg: "",
      jpeg: "",
      png: "",
      gif: "",
      docx: "",
      xlsx: "",
      mp4: "",
      mp3: "",
      rar: "",
      zip: "",
      pptx: "",
    },
  }),
};
</script>
