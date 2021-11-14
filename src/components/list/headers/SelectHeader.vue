<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :max-width="300"
    relative
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        :style="
          isFiltered ? 'border-radius:0;border-bottom: 1px solid red' : ''
        "
        class="pa-0"
        text
      >
        <span>{{ header.text }}</span>
        <v-icon class="mb-2" size="12" color="gray">mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="pa-2">
        <v-autocomplete
          v-if="$helpers.getSafe(header, 'props.multiple')"
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
                key: sendKey,
                field: 'arrays',
                data: $event,
              }),
              $store.commit('dynamic/setIsFiltering', true),
              $store.dispatch('dynamic/getWithFilter'),
            ]
          "
          :value="filterData.arrays[sendKey]"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item[itemText] }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text caption">
              (+{{ filterData.arrays[sendKey].length - 1 }} مورد دیگر)
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
          :value="filterData.selects[sendKey]"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item[itemText] }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text caption">
              (+{{ filterData.selects[sendKey].length - 1 }} مورد دیگر)
            </span>
          </template>
        </v-autocomplete>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["header", "runAfterChange", "sendKey"],

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
        (Array.isArray(this.filterData.selects[this.sendKey]) &&
          this.filterData.selects[this.sendKey].length) ||
        (Array.isArray(this.filterData.arrays[this.sendKey]) &&
          this.filterData.arrays[this.sendKey].length)
      );
    },
    itemText() {
      return this.$helpers.getSafe(this.header, "props.item-text", "text");
    },
    itemValue() {
      return this.$helpers.getSafe(this.header, "props.item-value", "value");
    },
  },

  methods: {
    change(event) {
      this.$store.commit("dynamic/setFilterData", {
        key: this.sendKey,
        field: "selects",
        data: event,
      });
      this.$store.commit("dynamic/setIsFiltering", true);
      this.runAfterChange
        ? this.runAfterChange(this.sendKey, event)
        : this.$store.dispatch("dynamic/getWithFilter");
      this.$majra.hasChild(this.header)
        ? this.$store.dispatch("dynamic/parentChanged", {
            field: this.header,
            values: event,
          })
        : "";
    },
  },
};
</script>
