<template>
  <div>
    <v-text-field
      :type="field.type"
      outlined
      dense
      @click="dialog = true"
      :value="form[field.field]"
      :label="field.title"
      :hint="field.hint"
      :rules="rules[field.field]"
      rows="2"
      outline
      readonly
      append-icon="mdi-image"
      hide-details
      v-bind="dynamicProps"
    />
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="pl-0 headline white--text py-1 secondary">
          <h6>انتخاب آیکون</h6>
          <v-spacer />
          <v-btn dark text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="d-flex flex-row">
          <v-col cols="3" v-if="cats.length">
            <v-row>
              <v-col>
                <v-btn @click="filter = false" block text>همه موارد</v-btn>
              </v-col>
              <v-col v-for="(cat, index) in cats" :key="'cat' + index">
                <v-btn @click="filter = cat" block text>{{ cat }}</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col
                v-for="(item, index) in items"
                :key="'item' + index"
                cols="3"
                style="cursor: pointer"
                @click="
                  [
                    fieldChanged(field, item[field.item_value]),
                    (dialog = false),
                  ]
                "
              >
                <v-img :src="baseURL + item[field.item_text]" cover />
              </v-col>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["fieldChanged", "field", "form", "dynamicProps"],

  mounted() {
    this.$emit("mounted");
  },

  computed: {
    ...mapGetters({
      rules: "dynamic/rules",
      getItemsWithKey: "dynamic/getItemsWithKey",
    }),
    items() {
      let out = this.getItemsWithKey(this.field.rel.model);

      if (this.filter === false) return out;

      return out.filter((i) => i.cat.name === this.filter);
    },
    cats() {
      let catsName = this.getItemsWithKey(this.field.rel.model)
        .map((i) => i.cat)
        .map((cat) => cat.name);

      catsName = Array.from(new Set(catsName));

      return catsName;
    },
  },

  data: () => ({
    dialog: false,
    filter: false,
  }),
};
</script>
