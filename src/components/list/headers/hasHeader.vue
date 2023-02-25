<template>
  <v-btn
    :style="
      isFiltered
        ? 'border-radius:0;border-bottom: 1px solid red;color: red !important;'
        : ''
    "
    class="pa-0"
    text
    @click="menu = !menu"
  >
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :max-width="300"
      relative
      left
    >
      <template v-slot:activator>
        <span>{{ header.text }}</span>
        <v-icon class="mb-2" size="12" color="gray">mdi-filter</v-icon>
      </template>
      <v-card>
        <v-card-text class="pa-2">
          <v-autocomplete
            v-if="header.multiple"
            hide-details
            :items="items"
            :item-text="itemText"
            :item-value="itemValue"
            :label="header.text"
            multiple
            outlined
            dense
            @change="
              [
                $store.commit('dynamic/setFilterData', {
                  key: getKey(),
                  field: 'has',
                  data: $event,
                }),
                $store.commit('dynamic/setIsFiltering', true),
                $store.dispatch('dynamic/getWithFilter'),
              ]
            "
            :value="filterData.arrays[getKey()]"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item[itemText] }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">
                (+{{ filterData.arrays[getKey()].length - 1 }}
                مورد دیگر)
              </span>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-else
            hide-details
            :items="items"
            :item-text="itemText"
            :item-value="itemValue"
            :label="header.text"
            multiple
            outlined
            dense
            @change="change"
            :value="filterData.has[getKey()]"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item[itemText] }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">
                (+{{ filterData.has[getKey()].length - 1 }}
                مورد دیگر)
              </span>
            </template>
          </v-autocomplete>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["header", "runAfterChange"],

  data() {
    return {
      menu: false,
    };
  },

  computed: {
    ...mapGetters({
      getItemsWithKey: "dynamic/getItemsWithKey",
      filterData: "dynamic/filterData",
      filters: "dynamic/headerFilters",
    }),
    itemText() {
      return this.$helpers.getSafe(this.header, "props.item-text", "text");
    },
    itemValue() {
      return this.$helpers.getSafe(this.header, "props.item-value", "value");
    },
    items() {
      if (this.header.values) return this.header.values;

      if (!this.header.rel) return [];

      if (this.header.needFilter) {
        return this.header.rel.model in this.filters
          ? this.filters[this.header.rel.model]
          : this.getItemsWithKey(this.header.rel.model);
      }

      if ("withChange" in this.header.rel) {
        return this.header.rel.withChange(
          this.getItemsWithKey(this.header.rel.model)
        );
      }

      return this.getItemsWithKey(this.header.rel.model);
    },
    isFiltered() {
      return (
        (Array.isArray(this.filterData.has[this.getKey()]) &&
          this.filterData.has[this.getKey()].length) ||
        (Array.isArray(this.filterData.arrays[this.getKey()]) &&
          this.filterData.arrays[this.getKey()].length)
      );
    },
  },
  methods: {
    change(event) {
      this.$store.commit("dynamic/setFilterData", {
        key: this.getKey(),
        field: "has",
        data: event,
      });
      this.$store.commit("dynamic/setIsFiltering", true);
      this.runAfterChange
        ? this.runAfterChange(this.getKey(), event)
        : this.$store.dispatch("dynamic/getWithFilter");
    },
    getKey() {
      return this.header.rel.throw + "|" + this.header.field;
    },
  },
};
</script>
