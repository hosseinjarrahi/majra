<template>
  <draggable
    :list="items[mainKey]"
    handle=".handle"
    tag="div"
    class="d-flex flex-row flex-wrap"
    @end="changeOrder(items[mainKey])"
  >
    <v-col
      :cols="getOpt('cardSize')"
      v-for="(item, index) in print ? printItems : items[mainKey]"
      :key="index + 'item'"
    >
      <v-card height="100%" class="pb-3 pa-1" style="overflow: hidden">
        <slot name="card" v-bind="item"></slot>

        <v-card-actions v-if="!print" class="fix-to-bottom">
          <action-value :item="item">
            <slot name="actions" v-bind="item"></slot>
          </action-value>
          <v-icon small class="handle" v-if="getOpt('draggable')">
            mdi-menu</v-icon
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </draggable>
</template>

<script>
import ActionValue from "./list/values/ActionValue.vue";
import { mapGetters } from "vuex";
const draggable = () => import("vuedraggable");

export default {
  components: { ActionValue, draggable },

  props: [
    "headers",
    "print",
    "printItems",
    "items",
    "mainLoading",
    "pagination",
    "options",
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
.fix-to-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
