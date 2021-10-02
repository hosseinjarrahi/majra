<template>
  <div>
    <slot name="table" v-bind="{ items: items[mainKey], headers, pagination }">
      <v-data-table
        dense
        hide-default-footer
        :headers="headers"
        :items="print ? printItems : items[mainKey]"
        :loading="mainLoading"
        :items-per-page="15"
        :server-items-length="!pagination.total ? 1 : pagination.total"
        @dblclick:row="false && showItem"
        :options.sync="options"
        :expanded.sync="expanded"
        :show-expand="expandMode"
        single-expand
      >
        <template v-for="header in headers" v-slot:[getHeader(header.value)]>
          <header-list :header="header" :key="'header' + header.field" />
        </template>

        <template v-if="!print" v-slot:item.actions="{ item }">
          <action-value :item="item">
            <slot name="actions" v-bind="item"> </slot>
          </action-value>
        </template>

        <template v-slot:item.index="{ item }">
          <div
            v-if="false"
            class="error"
            style="
              height: 20px;
              padding: 2px;
              border-radius: 10px 0px 0px 10px;
              position: absolute;
              right: 0;
            "
          ></div>
          <div
            v-if="hasSelected(item)"
            class="info"
            style="
              height: 20px;
              padding: 2px;
              border-radius: 10px 0px 0px 10px;
              position: absolute;
              right: 0;
            "
          ></div>
          <span>
            {{ getIndex(item) }}
          </span>
        </template>

        <template
          v-for="field in flatFields"
          v-slot:[getField(field.field)]="{ item }"
        >
          <slot :name="'item.' + field.field" v-bind="item">
            <values-list :field="field" :item="item" :key="field.field" />
          </slot>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <slot name="expansion" v-bind="{ headers, item }"> </slot>
        </template>
      </v-data-table>
    </slot>

    <div class="caption text-center pt-2">
      <v-pagination
        dense
        v-if="!print && pagination.lastPage != 1"
        v-model="page"
        :length="!pagination.lastPage ? 1 : pagination.lastPage"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const ValuesList = () => import("./list/values/ValuesList");
const HeaderList = () => import("./list/headers/HeaderList");
const ActionValue = () => import("./list/values/ActionValue.vue");

export default {
  components: { ValuesList, HeaderList, ActionValue },

  layout: "dashboard",

  props: ["print", "expandMode"],

  created() {
    this._listen("addToSelected", (item) => {
      if (this.selected.has(item.id)) this.selected.delete(item.id);
      else this.selected.add(item.id);
      this.selected = new Set(this.selected.values());
      this._event("multiDelete", this.selected.size);
    });

    this._listen("deleteSelected", () => {
      this._event("deleteBtn", [...this.selected]);
    });
  },

  computed: {
    ...mapGetters({
      items: "dynamic/items",
      printItems: "dynamic/printItems",
      printHeaders: "dynamic/printHeaders",
      mainLoading: "dynamic/mainLoading",
      pagination: "dynamic/pagination",
      mainKey: "dynamic/mainKey",
      flatFields: "dynamic/flatFields",
      isFiltering: "dynamic/isFiltering",
      HEADERS: "dynamic/headers",
      getItemsWithKey: "dynamic/getItemsWithKey",
    }),
    headers() {
      return this.print ? this.printHeaders : this.HEADERS;
    },
    hasSelected() {
      return (item) => this.selected.has(item.id);
    },
  },

  data() {
    return {
      dialog: false,
      editDialog: false,
      editItem: {},
      isEditing: false,
      page: 1,
      selects: {},
      arrays: {},
      dates: {},
      selected: new Set([]),
      change: false,
      options: {},
      expanded: [],
    };
  },

  watch: {
    page(val) {
      this.paginate(val);
    },
    options: {
      handler() {
        const { sortBy, sortDesc } = this.options;
        if (!sortBy[0]) return;

        this.$store.commit("dynamic/setFilterData", {
          field: "order",
          data: { key: "id", value: sortDesc[0] ? "ASC" : "DESC" },
        });
        this.$store.commit("dynamic/setIsFiltering", true);
        this.getItemsWithFilter();
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      getItems: "dynamic/get",
      getItemsWithFilter: "dynamic/getWithFilter",
    }),
    paginate(page) {
      if (!this.isFiltering)
        this.getItems({
          page,
          search: this.search,
          key: this.mainKey,
        });
      else
        this.getItemsWithFilter({
          page,
        });
    },
    getField(field) {
      return "item." + field;
    },
    getHeader(header) {
      return "header." + header;
    },
    getIndex(item) {
      return (
        this.getItemsWithKey(this.mainKey)
          .map((i) => i.id)
          .indexOf(item.id) +
        (15 * this.page - 14)
      );
    },
    showItem(data) {
      this._event("showBtn", data.item);
    },
  },
};
</script>