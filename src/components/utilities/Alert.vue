<template>
  <v-snackbar
    :value="openAlert"
    @input="setOpenAlert(false)"
    :color="color"
    timeout="4000"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="setOpenAlert(false)">
        <v-icon>fal fa-times</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "alert",

  created() {
    this._listen("alert", (payload) => {
      this.$store.dispatch("alert/alert", payload);
    });
  },

  methods: {
    ...mapMutations({
      setOpenAlert: "alert/setOpenAlert",
    }),
  },

  computed: {
    ...mapGetters({
      text: "alert/text",
      openAlert: "alert/openAlert",
      color: "alert/color",
    }),
  },
};
</script>

<style scoped></style>
