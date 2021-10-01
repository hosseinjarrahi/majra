<script>
import { mapActions, mapGetters } from "vuex";
import DynamicFormCore from "./DynamicFormCore.vue";

export default {
  components: { DynamicFormCore },

  props: ["value", "isEditing", "editItem"],

  created() {
    this.defineListeners();

    const initialValue = {};

    this.form = this.fields.reduce((obj, item) => {
      return {
        ...obj,
        ["sendKey" in item ? item["sendKey"] : item["field"]]:
          "default" in item
            ? typeof item.default == "function"
              ? item.default(this.editItem)
              : item.default
            : this.getDefault(item),
      };
    }, initialValue);

    if (!Array.isArray(this.FIELDS)) {
      this.valid = {};
      this.tabs = Object.keys(this.FIELDS);
    }

    this.initialForm = { ...this.form };
  },

  data() {
    return {
      form: {},
      initialForm: {},
      tabs: false,
      valid: false,
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
      return (fields) => {
        return this.$majra.filterFieldsByShow(
          fields,
          this.isEditing ? "edit" : "create"
        );
      };
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
      this.form[this.$majra.getSendKey(event)] = event.value;
      this._event("fieldChanged." + event.field, {
        value: event.value,
        instance: this,
      });
    },

    fieldsWithKey(key) {
      return this.FIELDS[key];
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
      this._listen("saveForm", (doYouWantToValidate = true) => {
        const save = () => {
          this.isEditing ? this.edit(this.form) : this.add(this.form);
        };
        if (doYouWantToValidate) {
          return this._event("validating", (valid) => {
            valid ? save() : "";
          });
        }
        return save();
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

      this._listen(["createBtn", "editBtn"], () => {
        this.form = { ...this.initialForm };
      });

      // this._listen("handleEnter", () => {
      //   this.validateForm()
      //     ? this.isEditing
      //       ? this.edit(this.form)
      //       : this.add(this.form)
      //     : "";
      // });

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
          let sendKey = this.$majra.getSendKey(field);
          if ("normalize" in field)
            return (this.form[sendKey] = field.normalize(
              this.form[field.field]
            ));
          if (field.type === "map")
            return (this.form[sendKey] = this.form[field.field]);
          if (
            this.form[field.field] &&
            typeof this.form[field.field] === "object"
          ) {
            if (!Array.isArray(this.form[field.field])) {
              this.form[sendKey] = field.objKey
                ? this.form[field.field][field.objKey]
                : this.form[field.field].id;
            } else if (
              this.form[field.field].length > 0 &&
              typeof this.form[field.field][0] == "object"
            ) {
              this.form[sendKey] = this.form[field.field].map((i) => {
                return field.objKey ? i[field.objKey] : i.id;
              });
            }
          }
        });
        this._event("callParentChanged");
      } else {
        this.form = { ...this.initialForm };
      }
      this._event("editItemMounted", { form: this.form, instance: this });
    },
    value(val) {
      val && this._event("dialog", this.isEditing);
    },
  },
};
</script>
