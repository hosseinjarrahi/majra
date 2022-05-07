<template>
  <v-dialog :value="value" @input="$emit('input', $event)" width="500">
    <v-card>
      <v-card-title class="pl-0 headline white--text py-1 secondary">
        <h6>{{ $t("Exel export") }}</h6>
        <v-spacer />
        <v-btn dark text @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="mt-5">
        <v-text-field
          v-model.number="itemPerPage"
          :label="$t('Number of output items')"
          outlined
          type="number"
          dense
          hide-details
        />
        <v-select
          :label="$t('Desired fields')"
          :items="flatFields"
          v-model="selectedFields"
          item-text="title"
          item-value="title"
          outlined
          dense
          class="mt-4"
          hide-details
          multiple
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!getCsv"
          color="primary"
          @click="exportCsv"
          small
          :loading="loading[mainKey]"
        >
          {{ $t("Get data") }}
        </v-btn>
        <download-csv v-else :data="csvValues" :fields="selectedFields">
          <v-btn small :loading="loading[mainKey]" class="mx-2" color="success">
            {{ $t("Download") }}
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </download-csv>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
const downloadCsv = () => import("vue-json-csv");

export default {
  props: ["value"],

  components: { downloadCsv },

  computed: {
    ...mapGetters({
      flatFields: "dynamic/flatFields",
      csvValues: "dynamic/csvValues",
      loading: "dynamic/loading",
      mainKey: "dynamic/mainKey",
    }),
  },

  data() {
    return {
      itemPerPage: 15,
      getCsv: false,
      selectedFields: [],
    };
  },

  watch: {
    value() {
      this.getCsv = false;
      this.selectedFields = null;
    },
  },

  methods: {
    async exportCsv() {
      await this.$store.dispatch("dynamic/getWithFilter", {
        itemPerPage: this.itemPerPage,
      });
      this.getCsv = true;
    },
  },
};
</script>

<style></style>
