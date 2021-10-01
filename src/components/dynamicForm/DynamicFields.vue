<template>
  <v-row class="ma-0">
    <template v-for="(fields, key) in fieldsGrouped(fields)">
      <field-set class="d-flex flex-wrap" :label="key" :key="key">
        <template v-for="(field, index) in fields">
          <v-col
            :class="field.class"
            :id="field.id"
            class="py-1 my-0 px-1"
            :key="field.field"
            cols="12"
            :md="md(field)"
          >
            <component
              :field="field"
              :fields="fields"
              :form="form"
              :fieldChanged="fieldChanged"
              :parentChanged="parentChanged"
              :filters="filters"
              :index="index"
              :is="getComponent(field)"
              @keypress.prevent.enter="_event('saveForm')"
              :dynamicProps="dynamicProps[field.field]"
            />
          </v-col>
        </template>
      </field-set>
    </template>
    <template v-for="(field, index) in fieldsNotGrouped(fields)">
      <v-col
        class="py-1 my-0 px-2"
        :id="field.id"
        :class="field.class"
        :key="field.field"
        cols="12"
        :md="md(field)"
      >
        <slot :name="'field.' + field.field" v-bind="{ field }">
          <component
            :field="field"
            :fields="fields"
            :form="form"
            :fieldChanged="fieldChanged"
            :parentChanged="parentChanged"
            :filters="filters"
            :index="index"
            :is="getComponent(field)"
            @keypress.prevent.enter="_event('saveForm')"
            :dynamicProps="dynamicProps[field.field]"
            @mounted="mounted(field.field)"
          />
        </slot>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

const Autocomplete = () => import("./../fields/Autocomplete");
const Date = () => import("./../fields/Date");
const File = () => import("./../fields/File");
const TextField = () => import("./../fields/TextField");
const TextArea = () => import("./../fields/TextArea");
// const DateTime = () => import("./../fields/DateTime");
const Combobox = () => import("./../fields/Combobox");
const Mapper = () => import("./../fields/Mapper");
const Checkbox = () => import("./../fields/Checkbox");
const Ckeditor = () => import("./../fields/Ckeditor");
const FieldSet = () => import("./../utilities/FieldSet");
const Switcher = () => import("./../fields/Switcher");
const ColorPicker = () => import("./../fields/ColorPicker");
const Radio = () => import("./../fields/Radio");
const Cropper = () => import("./../fields/Cropper");

export default {
  props: ["fields", "form", "index"],

  components: {
    TextField,
    Autocomplete,
    File,
    Date,
    // DateTime,
    Combobox,
    TextArea,
    Mapper,
    FieldSet,
    Checkbox,
    Ckeditor,
    Switcher,
    ColorPicker,
    Cropper,
    Radio,
  },

  created() {
    this._listen("createBtn", () => {
      this.filters = {};
    });

    this._listen("changeProps", ({ field, prop, value }) => {
      this.dynamicProps[field] = { [prop]: value };
      this.dynamicProps = { ...this.dynamicProps };
    });
  },

  data() {
    return {
      loading: false,
      filters: {},
      map: {
        text: "TextField",
        textarea: "TextArea",
        combo: "Combobox",
        select: "Autocomplete",
        file: "File",
        date: "Date",
        time: "DateTime",
        number: "TextField",
        map: "Mapper",
        password: "TextField",
        checkbox: "checkbox",
        ckeditor: "ckeditor",
        switcher: "Switcher",
        colorPicker: "ColorPicker",
        radio: "Radio",
        cropper: "Cropper",
      },
      dynamicProps: {},
    };
  },

  methods: {
    mounted(field) {
      this._event("mounted." + field, {
        item: this.form,
        field: field,
      });
    },

    fieldChanged(field, value) {
      this.$emit("updateField", { ...field, value });
    },

    parentChanged(field, value, init = false) {
      this.fieldChanged(field, value);

      if (!this.$majra.hasChild(field)) {
        return;
      }

      value = Array.isArray(value) ? value : [value];

      let items = this.getItemsWithKey(field.rel.child.model);

      this.filters[field.rel.child.model] = items.filter((item) => {
        if (item[field.rel.child.ownKey])
          return value.indexOf(item[field.rel.child.ownKey].id) > -1;
        return false;
      });

      this.filters = { ...this.filters };
      !init &&
        this.parentChanged(this.findFieldByModel(field.rel.child.model), null);
    },

    findFieldByModel(model) {
      return this.flatFields.filter((f) => f?.rel?.model == model)[0];
    },

    getComponent(field) {
      return "component" in field ? field.component : this.map[field.type];
    },
  },

  computed: {
    ...mapGetters({
      getItemsWithKey: "dynamic/getItemsWithKey",
      flatFields: "dynamic/flatFields",
      fieldsNotGrouped: "dynamic/fieldsNotGrouped",
      fieldsGrouped: "dynamic/fieldsGrouped",
    }),
    md() {
      return (field) => (field?.col?.md ? field?.col?.md : 12);
    },
  },
};
</script>
