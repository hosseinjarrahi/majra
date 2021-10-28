<template>
  <v-data-table
    dense
    hide-default-footer
    :headers="headers"
    :items="print ? printItems : items[mainKey]"
    :loading="mainLoading"
    :items-per-page="15"
    :server-items-length="!pagination.total ? 1 : pagination.total"
    :expanded.sync="expanded"
    :show-expand="getOpt('expandMode')"
    single-expand
  >
    <template v-for="header in headers" v-slot:[getHeader(header.value)]>
      <header-list :header="header" :key="'header' + header.field" />
    </template>

    <template v-slot:body="props" v-if="getOpt('draggable')">
      <draggable
        :list="props.items"
        tag="tbody"
        handle=".handle"
        @end="changeOrder(props.items)"
      >
        <tr v-for="item in props.items" :key="item.id">
          <td>
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
            <div v-if="hasSelected(item)" class="info selected-class"></div>
            <div>
              <v-icon small class="handle" v-if="getOpt('draggable')">
                mdi-drag
              </v-icon>
              {{ getIndex(item) }}
            </div>
          </td>
          <td v-for="field in flatFields.filter(f => f.isHeader)" :key="field.field">
            <values-list :field="field" :item="item" :key="field.field" />
          </td>
          <td>
            <action-value :item="item">
              <slot name="actions" v-bind="item"></slot>
            </action-value>
          </td>
        </tr>
      </draggable>
      <template v-if="props.items.length < 1">
        <tr class="text-center">
          <td colspan="100" class="py-4 grey--text">اطلاعاتی موجود نیست</td>
        </tr>
      </template>
    </template>

    <template v-if="!print" v-slot:item.actions="{ item }">
      <action-value :item="item">
        <slot name="actions" v-bind="item"></slot>
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

    <template v-slot:expanded-item="props">
      <slot name="expansion" v-bind="props"></slot>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

const HeaderList = () => import("./list/headers/HeaderList");
const ActionValue = () => import("./list/values/ActionValue.vue");
const ValuesList = () => import("./list/values/ValuesList");
const draggable = () => import("vuedraggable");

export default {
  components: { HeaderList, ActionValue, ValuesList, draggable },

  props: [
    "headers",
    "print",
    "printItems",
    "items",
    "mainLoading",
    "pagination",
    "expanded",
    "getHeader",
    "flatFields",
    "getField",
    "mainKey",
    "hasSelected",
    "getIndex",
  ],

  computed: mapGetters({
    getOpt: "dynamic/getOptionWithKey",
  }),

  methods: {
    changeOrder(items) {
      let data = items.map((item, index) => {
        return { id: item.id, ordering: index };
      });
      this._event("ordersChanged", data);
    },
  },
};
</script>

<style scoped>
.selected-class {
  height: 20px;
  padding: 2px;
  border-radius: 10px 0px 0px 10px;
  position: absolute;
  right: 0;
}
</style>
