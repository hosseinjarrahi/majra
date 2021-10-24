<template>
  <field-set
    :label="'آپلود ' + field.title"
    class="d-flex flex-row flex-wrap"
    style="min-height: 100px"
  >
    <v-col cols="12" v-if="loading">
      <v-progress-linear :value="progress"></v-progress-linear>
    </v-col>
    <v-card
      max-height="130px"
      class="mx-1 col-2 my-1 pa-2 d-flex align-center justify-center"
      style="border: 1px dashed black"
      @click="() => {}"
    >
      <label
        class="fill-height col-12 d-flex justify-center"
        style="cursor: pointer"
      >
        <input type="file" class="d-none" @change="upload($event, field)" />
        <v-icon v-if="loading">mdi-loading mdi-spin</v-icon>
        <v-icon v-else>mdi-plus</v-icon>
      </label>
    </v-card>

    <v-card
      max-width="150"
      max-height="130px"
      class="mx-1 col-2 my-1 pa-2 d-flex align-center justify-center"
      style="border: 1px solid black"
      @click="openFile(file)"
      v-for="file in files"
      :key="file"
    >
      <v-img v-if="field.isImage" :src="$majra.configs.BASE_URL + file" />
      <div v-else style="word-break: break-all !important">دانلود</div>
      <v-btn
        text
        color="error"
        style="position: absolute; left: 0px; top: 0px"
        class="px-1 py-0"
        x-small
        @click="remove(file)"
      >
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </v-card>
  </field-set>
</template>

<script>
import FieldSet from "./../utilities/FieldSet";
import AbstractField from "./AbstractField";

export default {
  extends: AbstractField,

  components: { FieldSet },

  data() {
    return {
      loading: false,
      progress: 0,
    };
  },

  methods: {
    upload(file, field) {
      file = file.target.files[0];
      if (!file) return;
      const config = {
        onUploadProgress: (progressEvent) =>
          (this.progress = (progressEvent.loaded / progressEvent.total) * 100),
      };
      this.loading = true;
      var formData = new FormData();
      formData.append("file", file);
      formData.append("type", field.fileType);
      this.axios
        .post(this.field.uploadPath, formData, config)
        .then((response) => {
          if (!field.multiple) {
            return this.updateField(response.link);
          }
          let temp = this.value || [];
          this.updateField([...temp, response.link]);
          this._event("alert", { text: "با موفقیت آپلود شد", color: "green" });
        })
        .catch(() => {
          this._event("alert", {
            text: "مشکلی در ارسال فایل رخ داده است",
            color: "red",
          });
        })
        .finally(() => (this.loading = false));
    },
    openFile(file) {
      return window.open(this.$majra.configs.BASE_URL + file);
    },
    remove(file) {
      this.updateField(
        Array.isArray(this.value) ? this.value.filter((f) => f != file) : null
      );
    },
  },

  computed: {
    files() {
      return Array.isArray(this.value)
        ? this.value
        : this.value
        ? [this.value]
        : [];
    },
  },
};
</script>
