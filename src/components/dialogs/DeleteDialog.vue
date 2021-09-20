<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="pl-0 headline white--text py-1 secondary">
        <h6>حذف</h6>
        <v-spacer />
        <v-btn dark text @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="mt-5">
        <div v-if="flag === null">در حال بارگزاری</div>
        <h2 v-if="flag == 0" class="font-weight-bold">
          آیا از حذف مطمئن هستید؟
        </h2>
        <h2 v-if="flag == 1" class="font-weight-bold mb-4">
          نمی توانید حذف کنید چون در موارد زیر استفاده شده است
        </h2>
        <div v-for="(index, key) in relation" :key="key">
          <p class="primary white--text rounded pa-2 ma-2">
            {{ key.split(",")[0] }}
          </p>
          <div v-for="(i, k) in index" :key="k">
            <v-btn
              text
              :to="key.split(',')[1]"
              class="mx-3 rounded pa-2 ma-0"
              >{{ i }}</v-btn
            >
          </div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="px-6" color="success" small @click="close()">
          <span>لغو</span>
        </v-btn>
        <v-btn
          v-if="flag == 0"
          class="px-6"
          color="error"
          :loading="mainLoading"
          small
          @click="remove(id)"
        >
          <span>حذف</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async created() {
    this._listen("handleDeleteDialog", (dialog) => {
      this.dialog = dialog;
      if (this.dialog == false) {
        this.flag = null;
        this.relation = null;
      }
      this._event("multiDelete", false);
    });
  },

  data: () => ({
    dialog: false,
    id: null,
    flag: null,
    relation: null,
  }),

  methods: {
    close() {
      this.flag = null;
      this.relation = null;
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

<style></style>
