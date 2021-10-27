<template>
  <v-data-table
    dense
    hide-default-footer
    :headers="headers"
    :items="print ? printItems : items[mainKey]"
    :loading="mainLoading"
    :items-per-page="15"
    :server-items-length="!pagination.total ? 1 : pagination.total"
    @dblclick:row="false && showItem"
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
</template>

<script>
const HeaderList = () => import("./list/headers/HeaderList");
const ActionValue = () => import("./list/values/ActionValue.vue");
const ValuesList = () => import("./list/values/ValuesList");

export default {
  components: { HeaderList, ActionValue, ValuesList },

  props: [
    "headers",
    "print",
    "printItems",
    "items",
    "mainLoading",
    "pagination",
    "showItem",
    "expanded",
    "expandMode",
    "getHeader",
    "flatFields",
    "getField",
    "mainKey",
    "hasSelected",
    "getIndex",
  ],
};
</script>
