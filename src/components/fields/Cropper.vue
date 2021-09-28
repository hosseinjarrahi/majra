<template>
  <div class="text-center">
    <v-file-input
      outlined
      dense
      :loading="loading"
      truncate-length="15"
      :label="field.title"
      :rules="field.rules"
      hide-details
      append-icon="mdi-file-outline"
      prepend-icon=""
      id="pick-avatar"
    />

    <div class="card-footer text-muted" v-html="message"></div>

    <avatar-cropper
      :upload-handler="cropperHandler"
      trigger="#pick-avatar"
      :labels="{ submit: 'OK', cancel: 'Cancel' }"
      v-bind="field.props"
      :cropper-options="{
        aspectRatio: 1,
        autoCropArea: 1,
        viewMode: 1,
        movable: true,
        zoomable: true,
      }"
    />
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
const axios = require("axios");

export default {
  name: "UploadPic",

  components: { AvatarCropper },

  props: ["fieldChanged", "field", "form"],

  data() {
    return {
      loading: false,
      message: "",
      file: "",
    };
  },

  methods: {
    cropperHandler(cropper) {
      this.loading = true;

      const DataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(",");
        const byteString =
          splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
      };
      let formData = new FormData();
      const file = DataURIToBlob(
        cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)
      );
      formData.append("file", file);
      setTimeout(() => {
        axios
          .post(this.UPLOAD_PATH, formData)
          .then((response) => {
            this.loading = false;

            this.file = response.data.link;

            this.fieldChanged(this.field, this.file);

            this._event("alert", {
              text: "با موفقیت آپلود شد",
              color: "green",
            });
          })
          .catch(() => {
            this._event("alert", {
              text: "مشکلی در ارسال فایل رخ داده است",
              color: "red",
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }, 1000);
    },
    handleUploaded(response) {
      if (response.status == "success") {
        this.user.avatar = response.url;
        // Maybe you need call vuex action to
        // update user avatar, for example:
        // this.$dispatch('updateUser', {avatar: response.url})
        this.message = "user avatar updated.";
      }
    },
  },
};
</script>

<style>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}

.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}

.card-img-overlay {
  display: none;
  transition: all 0.5s;
}

.card-img-overlay button {
  margin-top: 20vh;
}

.card:hover .card-img-overlay {
  display: block;
}
</style>
