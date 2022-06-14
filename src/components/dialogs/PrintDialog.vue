<template>
  <v-dialog :value="value" @input="$emit('input', $event)" width="500">
    <v-card>
      <v-card-title class="pl-0 headline white--text py-1 secondary">
        <h6>{{ translate("print") }}</h6>
        <v-spacer />
        <v-btn dark text @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="mt-5">
        <v-text-field
          v-model.number="itemPerPage"
          :label="translate('Number of output items')"
          outlined
          type="number"
          dense
          hide-details
        />
        <v-select
          :label="translate('Desired fields')"
          :items="headers.filter((i) => i.value != 'actions')"
          v-model="printFields"
          item-text="title"
          item-value="field"
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
        <v-btn color="primary" @click="print" small>{{
          translate("Print")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["value"],

  data() {
    return {
      itemPerPage: 15,
      printFields: [],
    };
  },

  computed: {
    ...mapGetters({
      headers: "dynamic/headers",
    }),
  },

  methods: {
    async print() {
      await this.$store.dispatch("dynamic/getWithFilter", {
        itemPerPage: this.itemPerPage,
      });
      this.$store.commit(
        "dynamic/setPrintHeaders",
        this.printFields.map((f) => {
          let out;
          this.headers.forEach((field) => {
            if (field.field == f)
              out = {
                ...field,
                text: field.title,
                value: field.field,
                sortable: false,
              };
          });
          return out;
        })
      );
      this.$router.push("/print");
    },
  },
};
</script>

<style></style>
