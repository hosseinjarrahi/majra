<template>
  <v-card>
    <slot name="card-title">
      <v-card-title class="pl-0 headline white--text py-1 secondary">
        <h6 v-if="!isEditing">افزودن</h6>
        <h6 v-else-if="!isShowing">ویرایش</h6>
        <h6 v-else>نمایش</h6>
        <v-spacer />
        <v-btn dark text @click="handleDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
    </slot>

    <v-card-text v-if="tabs" class="py-3">
      <v-tabs
        color="secondary"
        centered
        :value="tabModel"
        @change="$emit('input', $event)"
      >
        <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
        <v-tabs-items :value="tabModel" @change="$emit('input', $event)">
          <v-tab-item v-for="tab in tabs" :key="'item' + tab">
            <v-form :ref="'dynamicForm.' + tab">
              <dynamic-fields
                class="mt-4"
                :fields="filteredFields(fieldsWithKey(tab))"
                :form="form"
                @updateField="updateField"
              />
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card-text>

    <v-card-text class="py-3" v-else>
      <h1 class="text-center"><slot name="title"></slot></h1>
      <v-form ref="dynamicForm">
        <dynamic-fields
          :fields="filteredFields(fields)"
          :form="form"
          :isShowing="isShowing"
          @updateField="updateField"
        />
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions v-if="!isShowing">
      <v-spacer></v-spacer>
      <v-btn
        :color="isEditing ? 'primary' : 'success'"
        small
        :loading="mainLoading"
        class="px-10"
        @click="_event('saveForm')"
      >
        <span v-if="!isEditing">ثبت</span>
        <span v-else>ویرایش</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DynamicFields from "./DynamicFields.vue";

export default {
  components: { DynamicFields },

  props: [
    "tabs",
    "tabModel",
    "valid",
    "filteredFields",
    "fieldsWithKey",
    "form",
    "updateField",
    "fields",
    "isShowing",
    "isEditing",
    "mainLoading",
    "handleDialog",
  ],

  created() {
    this._listen("validating", (resolve) => {
      resolve(this.validateForm());
    });
  },

  methods: {
    validateForm() {
      if (this.tabs) {
        let validation = true;
        let i = 0;
        for (let tab of this.tabs) {
          if (
            this.$refs["dynamicForm." + tab] &&
            !this.$refs["dynamicForm." + tab][0].validate()
          ) {
            validation = false;
            this.$emit("input", i);
            break;
          }
          i++;
        }
        return validation;
      } else {
        return this.$refs.dynamicForm.validate();
      }
    },
  },
};
</script>
