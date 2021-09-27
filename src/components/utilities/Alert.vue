<template>
  <v-snackbar v-model="dialog" :color="alert.color" timeout="4000">
    {{ alert.text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="dialog = false">
        <v-icon>fal fa-times</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "alert",

  created() {
    this._listen("alert", (payload) => {
      this.alert = payload;
    });
  },

  data: () => ({
    alert: {
      color: "success",
      text: "",
    },
    dialog: false,
  }),
};
</script>
