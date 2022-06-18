<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header
        ref="header"
        v-show="false"
      ></v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card elevation="0" class="pt-3 pb-0">
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  class="col-12"
                  dense
                  outlined
                  hide-details
                  append-icon="mdi mdi-magnify"
                  @click:append="
                    [
                      $store.commit('dynamic/setFilterData', {
                        field: 'fields',
                        data: texts,
                      }),
                      $store.commit('dynamic/setFilterData', {
                        field: 'search',
                        data: search,
                      }),
                      $store.commit('dynamic/setIsFiltering', true),
                      getWithFilter(),
                    ]
                  "
                  :label="translate('Search text ...')"
                  v-model="search"
                />
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  multiple
                  outlined
                  dense
                  elevation="0"
                  :label="translate('Fields')"
                  v-model="texts"
                  :items="textFields"
                  item-text="title"
                  small-chips
                  item-value="field"
                  hide-details
                  auto-select-first
                  :allow-overflow="false"
                  deletable-chips
                  hide-selected
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-spacer></v-spacer>

            <v-btn
              outlined
              color="error"
              class="col-2 d-flex"
              small
              @click="doSearch(true)"
              >{{ translate("Reset") }}
            </v-btn>
            <v-btn
              color="success"
              class="col-2 d-flex"
              small
              :disabled="!texts[0]"
              @click="doSearch(false)"
              >{{ translate("Search") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["panel"],

  data() {
    return {
      texts: [],
      search: "",
      isSearching: false,
      menu: false,
    };
  },

  methods: {
    ...mapActions({
      getWithFilter: "dynamic/getWithFilter",
    }),

    doSearch(reset) {
      if (reset) {
        this.texts = [];
        this.search = "";
      }

      this.$store.commit("dynamic/setFilterData", {
        field: "fields",
        data: this.texts,
      });

      this.$store.commit("dynamic/setFilterData", {
        field: "search",
        data: this.search,
      });

      this.$store.commit("dynamic/setIsFiltering", true);

      this.getWithFilter();

      this.menu = false;
    },
  },

  computed: {
    ...mapGetters({
      flatFields: "dynamic/flatFields",
    }),
    textFields() {
      return this.flatFields.filter((field) => field.type === "text");
    },
  },

  watch: {
    panel() {
      this.$refs.header.$el.click();
    },
  },
};
</script>

<style scoped>
.v-btn {
  min-width: 0 !important;
}

.v-expansion-panel-content__wrap {
  padding-bottom: 0;
}
</style>
