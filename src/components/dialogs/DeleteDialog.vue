<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="px-0 headline white--text py-1 secondary">
        <h6 class="mx-4">{{ translate("Delete") }}</h6>
        <v-spacer />
        <v-btn dark text @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="mt-5">
        <h2 class="font-weight-bold">
          {{ translate("Are you sure you want to delete it?") }}
        </h2>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="px-6" color="success" small @click="close">
          <span>{{ translate("Cancel") }}</span>
        </v-btn>
        <v-btn
          class="px-6"
          color="error"
          :loading="mainLoading"
          small
          @click="remove(id)"
        >
          <span>{{ translate("Delete") }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async created() {
    this._listen("deleteBtn", (id) => {
      this.dialog = true;
      this.id = id;
    });
    this._listen("handleDeleteDialog", (dialog) => {
      this.dialog = dialog;
      this._event("multiDelete", false);
    });
  },

  data: () => ({
    dialog: false,
    id: null,
  }),

  methods: {
    close() {
      this.dialog = false;
    },
    ...mapActions({
      remove: "dynamic/remove",
    }),
  },

  computed: {
    ...mapGetters({
      mainLoading: "dynamic/mainLoading",
      mainKey: "dynamic/mainKey",
      getRouteWithKey: "dynamic/getRouteWithKey",
    }),
  },
};
</script>
