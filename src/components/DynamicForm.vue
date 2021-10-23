<template>
  <v-form>
    <dynamic-fields :fields="fields" :form="value" @updateField="updateField">
      <template v-slot:[`field.${field.field}`]="props" v-for="field in fields">
        <slot :name="'field.' + field.field" v-bind="props"></slot>
      </template>
    </dynamic-fields>
  </v-form>
</template>

<script>
import DynamicFields from "./dynamicForm/DynamicFields.vue";

export default {
  components: { DynamicFields },

  props: {
    editItem: { default: false },
    value: { default: () => {} },
    fields: { default: () => [] },
    autoGenerate: { default: () => true },
  },

  data() {
    return {
      initialForm: {},
      form: {},
    };
  },

  mounted() {
    if (this.editItem) this.initEditItem();
  },

  watch: {
    fields: {
      immediate: true,
      handler(newFields) {
        const initialValue = {};
        this.form = newFields.reduce((obj, item) => {
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
        this.initialForm = this.form;
        this.autoGenerate && this.$emit("input", { ...this.form });
      },
    },
  },

  methods: {
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

    async initEditItem() {
      if (this.editItem) {
        for (const prop in this.form) this.form[prop] = this.editItem[prop];
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
      this._event("editItemMounted", { value: this.form });
      this.$emit("input", { ...this.form });
    },

    updateField(event) {
      this.form[event.field] = event.value;
      this._event("fieldChanged." + event.field, {
        value: event.value,
        instance: this,
      });
      this.$emit("input", { ...this.form });
    },
  },
};
</script>
