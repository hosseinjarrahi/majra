<template>
  <v-dialog
    :value="value"
    @input="handleDialog"
    :fullscreen="options.fullScreen"
    :width="options.width"
    scrollable
  >
    <v-card>
      <v-card-title class="pl-0 headline white--text py-1 secondary">
        <h6 v-if="!isEditing">افزودن</h6>
        <h6 v-else-if="!isShowing">ویرایش</h6>
        <h6 v-else>نمایش</h6>
        <v-spacer />
        <v-btn dark text @click="handleDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <slot
        name="dialog"
        v-bind="{
          value,
          isEditing,
          isShowing,
          editItem,
        }"
      >
        <v-card-text v-if="tabs" class="pt-1 pb-1">
          <v-tabs color="secondary" centered v-model="tabModel">
            <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
            <v-tabs-items v-model="tabModel">
              <v-tab-item v-for="tab in tabs" :key="'item' + tab">
                <v-form v-model="valid[tab]" :ref="'dynamicForm.' + tab">
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

        <v-card-text class="pt-6 pb-3 pb-0" v-else>
          <v-form v-model="valid" ref="dynamicForm">
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
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dynamicFields from "./DynamicFields.vue";

export default {
  components: { dynamicFields },

  props: ["value", "isEditing", "isShowing", "editItem"],

  created() {
    this.defineListeners();

    const initialValue = {};

    this.form = this.fields.reduce((obj, item) => {
      return {
        ...obj,
        [item["field"]]:
          "default" in item
            ? typeof item.default == "function"
              ? item.default(this.editItem)
              : item.default
            : this.getDefault(item),
      };
    }, initialValue);

    if (!Array.isArray(this.FIELDS)) this.tabs = Object.keys(this.FIELDS);

    this.initialForm = this.form;
  },

  data() {
    return {
      form: {},
      initialForm: {},
      tabs: false,
      valid: {},
      tabModel: 0,
      options: {
        width: (2 / 3) * 100 + "%",
        fullScreen: false,
      },
    };
  },

  computed: {
    ...mapGetters({
      FIELDS: "dynamic/fields",
      fields: "dynamic/flatFields",
      items: "dynamic/items",
      mainLoading: "dynamic/mainLoading",
    }),
    filteredFields() {
      return (fields) =>
        fields.filter((field) => {
          if ("showIn" in field) {
            return this.isEditing
              ? field.showIn.indexOf("edit") > -1
              : field.showIn.indexOf("create") > -1;
          }
          return true;
        });
    },
  },

  methods: {
    ...mapActions({
      add: "dynamic/add",
      edit: "dynamic/edit",
    }),

    handleDialog(e) {
      this.$emit("input", e);
    },

    updateField(event) {
      this.form[event.field] = event.value;
      this._event("fieldChanged." + event.field, {
        value: event.value,
        instance: this,
      });
    },

    fieldsWithKey(key) {
      return this.FIELDS[key];
    },

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
            this.tabModel = i;
            break;
          }
          i++;
        }
        return validation;
      } else {
        return this.$refs.dynamicForm.validate();
      }
    },

    getDefault(item) {
      const getNow = () => {
        let toDay = new Date();
        return (
          toDay.getFullYear() + "-" + toDay.getMonth() + "-" + toDay.getDay()
        );
      };

      switch (item.type) {
        case "date":
          return getNow();
        case "file":
          return null;
        default:
          return "";
      }
    },

    defineListeners() {
      this._listen("saveForm", () => {
        this.validateForm()
          ? this.isEditing
            ? this.edit(this.form)
            : this.add(this.form)
          : "";
      });

      this._listen("changeField", ({ field, value }) => {
        this.form[field] = value;
      });

      this._listen("changeOptions", (comingOptions) => {
        let options = comingOptions.dialog;
        if (options) {
          for (const property in options) {
            this.options[property] = options[property];
          }
        }
      });

      this._listen("handleEnter", () => {
        this.validateForm()
          ? this.isEditing
            ? this.edit(this.form)
            : this.add(this.form)
          : "";
      });

      this._listen("editTheItem", (item) => {
        this.edit(item);
      });

      this._listen("addTheItem", (item) => {
        this.add(item);
      });
    },
  },

  watch: {
    async editItem(val) {
      if (val) {
        this.form = { ...val };
        await this.fields.forEach((field) => {
          if (field.type == "map")
            return (this.form[field.field] = this.form[field.field]);
          if (
            this.form[field.field] &&
            typeof this.form[field.field] === "object"
          ) {
            if (!Array.isArray(this.form[field.field])) {
              this.form[field.field] = field.objKey
                ? this.form[field.field][field.objKey]
                : this.form[field.field].id;
            } else if (
              this.form[field.field].length > 0 &&
              typeof this.form[field.field][0] == "object"
            ) {
              this.form[field.field] = this.form[field.field].map((i) => {
                return field.objKey ? i[field.objKey] : i.id;
              });
            }
          }
        });
        this._event("callParentChanged");
      } else {
        this.form = { ...this.initialForm };
      }
      this._event("editItemMounted", { form: this.form });
    },
    value(val) {
      val && this._event("dialog", this.isEditing);
    },
  },
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
