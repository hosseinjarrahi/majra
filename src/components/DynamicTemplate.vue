<template>
  <v-card>
    <v-scroll-x-reverse-transition>
      <div v-show="dialogMode || !dialog">
        <dynamic-header />
        <dynamic-list :expand-mode="expandMode" :list-type="listType">
          <template v-slot:actions="props">
            <slot name="actions" v-bind="props"></slot>
          </template>
          <template v-slot:table="props">
            <slot name="table" v-bind="props"></slot>
          </template>
          <template v-slot:expansion="props">
            <slot name="table.expansion" v-bind="props"></slot>
          </template>
        </dynamic-list>
      </div>
    </v-scroll-x-reverse-transition>

    <v-scroll-x-reverse-transition>
      <component
        :is="dialogMode ? 'dynamic-dialog-form' : 'dynamic-tab-form'"
        v-model="dialog"
        :editItem="editItem"
        :isEditing="isEditing"
      >
        <template v-slot:dialog="props">
          <slot name="dialog" v-bind="props"></slot>
        </template>
        <template v-slot:title>
          <slot name="formTitle"></slot>
        </template>
      </component>
    </v-scroll-x-reverse-transition>

    <show-dialog>
      <template v-slot="props">
        <slot name="showDialog" v-bind="props"></slot>
      </template>
      <template v-slot:[`item.${field.field}`]="props" v-for="field in fields">
        <slot :name="'showDialog.item.' + field.field" v-bind="props"></slot>
      </template>
    </show-dialog>

    <delete-dialog />

    <slot name="extra"></slot>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import toCamelCase from "lodash/camelCase";

const DynamicDialogForm = () => import("./dynamicForm/DynamicDialogForm.vue");
const DynamicFilter = () => import("./DynamicFilter.vue");
const DynamicList = () => import("./DynamicList.vue");
const DynamicHeader = () => import("./DynamicHeader.vue");
const DynamicTabForm = () => import("./dynamicForm/DynamicTabForm.vue");
const ShowDialog = () => import("./dialogs/ShowDialog.vue");
const DeleteDialog = () => import("./dialogs/DeleteDialog.vue");

export default {
  layout: "dashboard",

  props: {
    dialogMode: { default: true },
    expandMode: { default: false },
    listType: { default: "table" },
  },

  components: {
    DynamicList,
    DynamicDialogForm,
    DynamicFilter,
    DynamicHeader,
    ShowDialog,
    DeleteDialog,
    DynamicTabForm,
  },

  created() {
    this.defineListeners();
  },

  mounted() {
    this._event("templateMounted");
  },

  data() {
    return {
      dialog: false,
      editDialog: false,
      editItem: {},
      isEditing: false,
    };
  },

  computed: {
    ...mapGetters({
      fields: "dynamic/fields",
      mainLoading: "dynamic/mainLoading",
      getOptionWithKey: "dynamic/getOptionWithKey",
    }),
  },

  methods: {
    toCamelCase,

    defineListeners() {
      this._listen("createBtn", () => {
        this.isEditing = false;
        this.editItem = false;
        this.dialog = true;
      });

      this._listen("editBtn", (editItem) => {
        this.editItem = editItem;
        this.isEditing = true;
        this.dialog = true;
      });

      this._listen("handleDialogForm", (dialog) => {
        this.dialog = dialog;
      });

      this._listen("injectField", ({ field, value }) => {
        this.$store.commit("dynamic/mergeField", { field, value });
      });

      this._listen("reset", () => {
        this.$store.commit("dynamic/restoreBackup");
      });
    },
  },
};
</script>

<style>
.v-btn {
  min-width: 0 !important;
}

input {
  padding: 0 !important;
}
</style>
