<template>
  <table
    class="col-12 mt-3"
    style="border-collapse: collapse; font-size: 0.9rem"
  >
    <tbody class="col-12">
      <tr v-for="(value, key) in standardData" :key="key">
        <slot
          v-bind="{ items: standardData, item: value }"
          :name="'item.' + value.field.field"
        >
          <td class="pa-2 font-weight-bold" v-if="value.field.title">
            {{ value.field.title }}
          </td>
          <td style="border-left: 0">
            <component
              :is="map[value.field.type]"
              :getValue="getValue"
              :getFiles="getFiles"
              :openImage="openImage"
              :value="value"
              :item="standardData"
              class="pa-2"
            />
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
const DefaultShow = () => import("./list/shows/DefaultShow.vue");
const EditorShow = () => import("./list/shows/EditorShow.vue");
const FileShow = () => import("./list/shows/FileShow.vue");
const MapShow = () => import("./list/shows/MapShow.vue");

export default {
  props: {
    fields: { default: [] },
    data: { default: () => ({}) },
  },

  data() {
    return {
      map: {
        date: DefaultShow,
        select: DefaultShow,
        combo: DefaultShow,
        text: DefaultShow,
        textarea: DefaultShow,
        number: DefaultShow,
        time: DefaultShow,
        switcher: DefaultShow,
        ckeditor: EditorShow,
        gallery: FileShow,
        file: FileShow,
        map: MapShow,
      },
      standardData: {},
    };
  },

  methods: {
    getValue(value) {
      if (value.field.type == "date")
        return this.$helpers.persianDate(value.value);

      if (value.field.type == "ckeditor") return value.value;

      if (value.field.type == "map") return value.value;

      if (value.field.type == "select" && value.field.values) {
        for (const item of value.field.values) {
          if (item.value == value.value) return item.text;
        }
      }

      return value.value && typeof value.value === "object"
        ? Array.isArray(value.value)
          ? this.getArrayValues(value)
          : "item_text" in value.field
          ? value.value[value.field.item_text]
          : this.getObject(value.value)
        : value.value;
    },

    getObject() {},

    getArrayValues({ value, field }) {
      if (this.isArrayOfObjects(value)) {
        return value
          .map((v) => v["item_text" in field ? field.item_text : "text"])
          .join(" , ");
      }
      return value.join(",");
    },

    getFiles(value) {
      let out = (Array.isArray(value) ? value : [value]).filter(
        (v) => !!v && v != "null"
      );
      return out.map((img) => window.baseURL + img);
    },

    isArrayOfObjects(values) {
      return values.length > 0 && typeof values[0] === "object";
    },

    openImage(image) {
      this.imageDialog = true;
      this.showImage = image;
    },
  },

  watch: {
    data: {
      immediate: true,
      handler(newData) {
        let tmp = {};
        this.fields.forEach((field) => {
          tmp[field.field] = {
            field,
            value: this.$helpers.getSafe(newData,field.field),
          };
        });
        this.standardData = { ...tmp };
      },
    },
  },
};
</script>

<style scoped>
td:last-child {
  border: 0px;
}
</style>
