<template>
  <v-dialog
    :value="value"
    @input="handleDialog"
    :fullscreen="options.fullScreen"
    :width="options.width"
    scrollable
  >
    <slot
      name="dialog"
      v-bind="{
        value,
        isEditing,
        isShowing,
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
        :isShowing="isShowing"
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
  width: 10px;
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
.v-card__text {
  scrollbar-color: #627898 rgb(255, 255, 255) !important;
  scrollbar-shadow-color: inset 0px 0px 6px rgba(0, 0, 0, 0.3) !important;
  scrollbar-width: thin;
}

.v-card__text::-webkit-scrollbar {
  width: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.3);
}
.v-card__text::-webkit-scrollbar-thumb {
  background-color: #627898;
  border-radius: 1px -100px 1px 1px;
}
</style>
