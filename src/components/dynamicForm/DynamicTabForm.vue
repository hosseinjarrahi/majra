<template>
  <v-card v-if="value">
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
  </v-card>
</template>

<script>
import DynamicFormAbstract from "./DynamicFormAbstract";

export default {
  extends: DynamicFormAbstract,
};
</script>
