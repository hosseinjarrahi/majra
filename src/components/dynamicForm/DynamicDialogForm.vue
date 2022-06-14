<template>
  <v-dialog
    :value="value"
    @input="handleDialog"
    :width="$vuetify.breakpoint.lgAndUp ? (2 / 6) * 100 + '%' : '100%'"
    scrollable
  >
    <slot
      name="dialog"
      v-bind="{
        value,
        isEditing,
        editItem,
      }"
    >
      <dynamic-form-core
        :tabs="tabs"
        :tabModel="tabModel"
        :valid="valid"
        :filteredFields="filteredFields"
        :fieldsWithKey="fieldsWithKey"
        :form="form"
        :updateField="updateField"
        :fields="fields"
        :isEditing="isEditing"
        :mainLoading="mainLoading"
        :handleDialog="handleDialog"
        @input="tabModel = $event"
      />
    </slot>
  </v-dialog>
</template>

<script>
import DynamicFormAbstract from "./DynamicFormAbstract";

export default {
  extends: DynamicFormAbstract,
};
</script>

<style>
.v-dialog.v-dialog--active::-webkit-scrollbar {
  width: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.3);
}
.v-dialog.v-dialog--active::-webkit-scrollbar-thumb {
  background-color: #627898;
  border-radius: 1px -100px 1px 1px;
}
.v-dialog.v-dialog--active {
  scrollbar-color: #627898 rgb(255, 255, 255) !important;
  scrollbar-shadow-color: inset 0px 0px 6px rgba(0, 0, 0, 0.3) !important;
  scrollbar-width: thin;
}
.v-card_text {
  scrollbar-color: #627898 rgb(255, 255, 255) !important;
  scrollbar-shadow-color: inset 0px 0px 6px rgba(0, 0, 0, 0.3) !important;
  scrollbar-width: thin;
}

.v-card_text::-webkit-scrollbar {
  width: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.3);
}
.v-card_text::-webkit-scrollbar-thumb {
  background-color: #627898;
  border-radius: 1px -100px 1px 1px;
}
</style>
