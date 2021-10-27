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
        v-bind="attrs"
        v-on="on"
        class="pa-0 border-bottom"
        text
        @click="menu = !menu"
        :style="
          isFiltered ? 'border-radius:0;border-bottom: 1px solid red' : ''
        "
      >
        <span :key="header.text">{{ header.text }}</span>
        <v-icon class="mb-2" size="12" color="gray">mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-card>
      <date-picker
        @close="onClose"
        :auto-submit="true"
        :ref="'date' + header.field"
        class="mamad-show-picker mamad"
        format="YYYY/MM/DD"
        v-model="filterData.dates[header.value]"
        :min="minDate"
        range
        @input="change"
      />
      <v-btn class="d-flex col-12" color="error" small @click="reset">
        ریست
      </v-btn>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  props: ["header", "runAfterChange"],

  components: { DatePicker: VuePersianDatetimePicker },

  watch: {
    menu() {
      setTimeout(() => {
        this.clickTo(this.header.field);
      }, 50);
    },
  },

  data() {
    return {
      menu: false,
    };
  },

  computed: {
    ...mapGetters({
      filterData: "dynamic/filterData",
    }),
    minDate() {
      return this.filterData.dates[this.header.value] &&
        this.filterData.dates[this.header.value].length
        ? this.filterData.dates[this.header.value][0]
        : "0";
    },
    isFiltered() {
      return (
        Array.isArray(this.filterData.dates[this.header.value]) &&
        this.filterData.dates[this.header.value].length
      );
    },
  },

  methods: {
    clickTo(field) {
      this.$refs["date" + field].$el.children[0].children[0].click();
    },
    onClose(piker) {
      piker.visible = true;
    },
    change(event) {
      this.$store.commit("dynamic/setFilterData", {
        key: this.header.value,
        field: "dates",
        data: event,
      });
      this.$store.commit("dynamic/setIsFiltering", true);
      this.runAfterChange
        ? this.runAfterChange(this.header.value, event)
        : this.$store.dispatch("dynamic/getWithFilter");
    },
    reset() {
      this.$store.commit("dynamic/setFilterData", {
        key: this.header.value,
        field: "dates",
        data: [],
      });
      this.runAfterChange
        ? this.runAfterChange(this.header.value, [])
        : this.$store.dispatch("dynamic/getWithFilter");
    },
  },
};
</script>

<style>
.mamad .vpd-input-group {
  display: none !important;
}

.mamad-show-picker .vpd-wrapper {
  position: relative;
  background-color: transparent;
}

.mamad-show-picker .vpd-container {
  position: relative;
  -webkit-transform: translate(0%, 0%) !important;
  transform: translate(0%, 0%) !important;
  left: 0 !important;
}

.mamad-show-picker .vpd-content {
  box-shadow: 0 0 0 0 !important;
}

.mamad-show-picker .vpd-wrapper .vpd-container {
  margin: 0px !important;
}
</style>
