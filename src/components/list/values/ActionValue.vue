<template>
  <div class="d-flex flex-row justify-end align-center">
    <slot></slot>
    <v-tooltip v-if="isShowable('show')" small bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
          x-small
          @click="_event('showBtn', item)"
        >
          <v-icon color="primary" small>mdi-eye</v-icon>
        </v-btn>
      </template>

      <span>مشاهده جزئیات</span>
    </v-tooltip>

    <v-tooltip v-if="isShowable('edit') && permission.edit" small bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-on="on"
          v-bind="attrs"
          x-small
          @click="_event('editBtn', item)"
        >
          <v-icon small color="info">mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>

      <span>ویراش کردن</span>
    </v-tooltip>

    <v-tooltip v-if="isShowable('delete') && permission.delete" small bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          text
          x-small
          @click="_event('deleteBtn', item.id)"
        >
          <v-icon color="error" small>mdi-delete</v-icon>
        </v-btn>
      </template>

      <span>حذف کردن</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["item"],

  computed: {
    ...mapGetters({
      permission: "dynamic/permission",
      loading: "dynamic/loading",
      mainKey: "dynamic/mainKey",
      hiddenActions: "dynamic/hiddenActions",
    }),
  },
  methods: {
    isShowable(val) {
      return !(this.hiddenActions.indexOf(val) > -1);
    },
  },
};
</script>

<style></style>
