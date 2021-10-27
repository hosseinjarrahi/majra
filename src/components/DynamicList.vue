<template>
  <div>
    <slot name="table" v-bind="{ items: items[mainKey], headers, pagination }">
      <component :is="listMap[listType]" v-bind="bind()">
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </component>
    </slot>
    <div class="caption text-center pt-2">
      <v-pagination
        dense
        v-if="!print && pagination.lastPage != 1"
        v-model="page"
        :length="!pagination.lastPage ? 1 : pagination.lastPage"
        :total-visible="5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DynamicTable from "./DynamicTable.vue";
import DynamicCard from "./DynamicCard.vue";

export default {
  layout: "dashboard",

  props: ["print", "expandMode", "listType", "draggable"],

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
      listMap: {
        card: DynamicCard,
        table: DynamicTable,
      },
    };
  },

  watch: {
    page(val) {
      this.paginate(val);
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
    bind() {
      return {
        headers: this.headers,
        print: this.print,
        printItems: this.printItems,
        items: this.items,
        mainLoading: this.mainLoading,
        pagination: this.pagination,
        expanded: this.expanded,
        expandMode: this.expandMode,
        getHeader: this.getHeader,
        flatFields: this.flatFields,
        getField: this.getField,
        mainKey: this.mainKey,
        hasSelected: this.hasSelected,
        getIndex: this.getIndex,
        draggable: this.draggable,
      };
    },
  },
};
</script>
