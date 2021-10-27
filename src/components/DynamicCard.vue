<template>
  <div class="d-flex flex-row flwx-wrap">
    <v-col
      cols="3"
      v-for="(item, index) in print ? printItems : items[mainKey]"
      :key="index + 'item'"
    >
      <v-card height="100%" class="pb-3 pa-1" style="overflow: hidden">
        <slot name="card" v-bind="item"> </slot>

        <v-card-actions v-if="!print" class="fix-to-bottom">
          <action-value :item="item">
            <slot name="actions" v-bind="item"> </slot>
          </action-value>
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import ActionValue from "./list/values/ActionValue.vue";

export default {
  components: { ActionValue },

  props: [
    "headers",
    "print",
    "printItems",
    "items",
    "mainLoading",
    "pagination",
    "options",
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

<style scoped>
.fix-to-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
