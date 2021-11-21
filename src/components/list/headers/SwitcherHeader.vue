<template>
  <div>
    <v-switch
      class="ma-0"
      :input-value="filterData.selects[header.value]"
      @change="change"
      :label="text"
      hide-details
    ></v-switch>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["header", "runAfterChange"],

  computed: {
    ...mapGetters({
      filterData: "dynamic/filterData",
    }),
    isFiltered() {
      return false;
    },
    text() {
      if (this.header.values && this.filterData.selects[this.header.value]) {
        return this.header.values.filter(
          (h) => h.value == this.filterData.selects[this.header.value]
        )[0].text;
      }

      return this.header.text;
    },
  },

  methods: {
    change(event) {
      this.$store.commit("dynamic/setFilterData", {
        key: this.header.value,
        field: "excepts",
        data: ["=", event],
      });
      this.$store.commit("dynamic/setIsFiltering", true);
      this.runAfterChange
        ? this.runAfterChange(this.header.value, event)
        : this.$store.dispatch("dynamic/getWithFilter");
    },
  },
};
</script>
