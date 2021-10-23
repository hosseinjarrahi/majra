<template>
  <div class="">
    <v-file-input
      v-show="
        !form[field.field] || $helpers.getSafe(field, 'props.multiple', false)
      "
      :ref="'file-i' + field.field"
      @change="upload($event, field)"
      :rules="field.rules"
      v-bind="{ ...defaultProps, ...getProp('*', {}) }"
      v-on="getFromField('events', {})"
    />
    <v-progress-linear v-if="progress && progress < 100" :value="progress" />

    <field-set
      :label="field.title + ' آپلود شده'"
      v-if="!field.multiple && form[field.field]"
    >
      <v-col
        class="
          file-input
          rounded-md
          elevation-1
          py-0
          my-0
          mb-2
          d-flex
          align-center
          flex-row
        "
      >
        <a
          target="_blank"
          class="col-10 py-2"
          :href="$majra.configs.BASE_URL + form[field.field]"
        >
          دانلود
        </a>
        <v-spacer />
        <v-btn
          class="col-2"
          small
          text
          color="error"
          @click="fieldChanged(field, null)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </field-set>

    <field-set
      :label="field.title + ' آپلود شده'"
      v-if="
        field.multiple &&
        Array.isArray(form[field.field]) &&
        form[field.field].length
      "
    >
      <div class="d-flex flex-column">
        <v-col
          class="
            file-input
            rounded-lg
            elevation-1
            mb-1
            d-flex
            py-0
            mt-0
            align-center
            flex-row
          "
          :key="file"
          v-for="(file, index) in form[field.field]"
        >
          <a
            target="_blank"
            class="col-10"
            :href="$majra.configs.BASE_URL + file"
          >
            <span>{{ index + 1 }} - </span>
            <span>دانلود</span>
          </a>
          <v-spacer />
          <v-btn
            text
            class="col-2"
            color="error"
            @click="
              [
                (files = files.filter((f) => f != file)),
                fieldChanged(field, files),
              ]
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </div>
    </field-set>
  </div>
</template>

<script>
import fieldSet from "./../utilities/FieldSet.vue";
import AbstractField from "./AbstractField";

const axios = require("axios");

export default {
  extends: AbstractField,

  components: { fieldSet },

  data() {
    return {
      loading: false,
      files: [],
      progress: 0,
      defaultProps: {
        dense: true,
        outlined: true,
        "prepend-icon": "",
        "hide-details": true,
        "truncate-length": 15,
        label: this.field.title,
        "append-icon": "mdi-file-outline",
      },
    };
  },

  mounted() {
    this.files = Array.isArray(this.form[this.field.field])
      ? [...this.form[this.field.field]]
      : this.form[this.field.field];

    this.$emit("mounted");
  },

  methods: {
    upload(file, field) {
      if (!file) return;
      const config = {
        onUploadProgress: (progressEvent) =>
          (this.progress = (progressEvent.loaded / progressEvent.total) * 100),
      };

      this.loading = true;
      var formData = new FormData();
      formData.append("file", file);
      formData.append("type", field.fileType);
      axios
        .post(this.$majra.configs.UPLOAD_PATH, formData, config)
        .then((response) => {
          if (field.multiple) {
            if (!Array.isArray(this.files)) this.files = [];
            this.files.push(response.link);
          } else {
            this.files = response.link;
          }

          this.fieldChanged(field, this.files);

          this._event("alert", { text: "با موفقیت آپلود شد", color: "green" });
        })
        .catch((error) => {
          this._log(error, 'error')
          this._event("alert", {
            text: "مشکلی در ارسال فایل رخ داده است",
            color: "red",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
