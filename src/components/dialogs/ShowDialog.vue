<template>
  <v-dialog
    fullscreen
    hide-overlay
    v-model="dialog"
    transition="dialog-bottom-transition"
    width="500"
    scrollable
  >
    <v-card
      :class="printMode ? 'elevation-0' : ''"
      :color="printMode ? '' : '#f5f5f5'"
    >
      <v-card-title
        v-if="!printMode"
        class="pl-0 headline white--text py-1 secondary"
      >
        <h6>نمایش</h6>
        <v-spacer />
        <v-btn dark text @click="print"><v-icon>mdi-printer</v-icon></v-btn>
        <v-btn dark text @click="_event('handleShowDialog', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text :class="printMode ? 'mt-0' : 'mt-5'">
        <slot v-bind="showItem">
          <v-row justify="center" align="center">
            <v-col
              :cols="printMode ? 12 : 8"
              :class="printMode ? '' : 'elevation-2'"
              class="rounded white"
            >
              <table class="col-12 mt-3" style="border-collapse: collapse">
                <tbody class="col-12">
                  <tr v-for="(value, key) in item" :key="key" class="d-flex">
                    <slot
                      v-bind="{ items: item, item: value }"
                      :name="'item.' + value.field.field"
                    >
                      <td class="col-2 pa-2 font-weight-bold">
                        {{ value.field.title }}
                      </td>
                      <td class="pa-2">|</td>
                      <component
                        :is="map[value.field.type]"
                        :getValue="getValue"
                        :getFiles="getFiles"
                        :openImage="openImage"
                        :value="value"
                        :item="item"
                        class="pa-2"
                      />
                    </slot>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
        </slot>
      </v-card-text>
    </v-card>

    <v-dialog v-model="imageDialog" width="500">
      <v-card>
        <v-img :src="showImage">
          <v-btn icon>
            <v-icon>mdi-printer</v-icon>
          </v-btn>
          <v-btn icon style="float: left" @click="imageDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-img>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
const Map = () => import("@/components/utilities/Map");
const Editor = () => import("@/components/utilities/Editor.vue");
const DefaultShow = () => import("../list/shows/DefaultShow.vue");
const EditorShow = () => import("../list/shows/EditorShow.vue");
const FileShow = () => import("../list/shows/FileShow.vue");
const MapShow = () => import("../list/shows/MapShow.vue");

export default {
  components: { Map, Editor, DefaultShow, EditorShow, FileShow, MapShow },

  created() {
    this._listen("showBtn", (showItem, dialog = true) => {
      this.dialog = dialog;
      this.showItem = showItem;
    });
    this._listen("handleShowDialog", (dialog) => {
      this.dialog = dialog;
    });
  },

  watch: {
    showItem(val) {
      let field = false;
      for (const property in val) {
        field = this.findFieldWithKey(property);
        if (!field) continue;
        if (field.type == "file" && this.isImage(val[property]))
          field.isImage = true;
        this.item[property] = { value: val[property], field: field };
      }
      this._event("showItemMounted", { item: this.item });
    },
  },

  data() {
    return {
      item: {},
      imageDialog: false,
      showImage: "",
      printMode: false,
      dialog: false,
      showItem: {},
      map: {
        date: "DefaultShow",
        select: "DefaultShow",
        combo: "DefaultShow",
        text: "DefaultShow",
        textarea: "DefaultShow",
        file: "FileShow",
        ckeditor: "EditorShow",
        time: "DefaultShow",
        number: "DefaultShow",
        switcher: "DefaultShow",
        gallery: "DefaultShow",
        map: "MapShow",
      },
    };
  },

  computed: {
    ...mapGetters({
      findFieldWithKey: "dynamic/findFieldWithKey",
      isImage: "dynamic/isImage",
      persianDate: "dynamic/persianDate",
    }),
  },

  methods: {
    getValue(value) {
      if (value.field.type == "date") return this.persianDate(value.value);

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
      return out.map((img) => this.baseURL + img);
    },
    isArrayOfObjects(values) {
      return values.length > 0 && typeof values[0] === "object";
    },
    openImage(image) {
      this.imageDialog = true;
      this.showImage = image;
    },
    print() {
      this.printMode = true;
      setTimeout(() => {
        window.print();
        this.printMode = false;
      }, 500);
    },
  },
};
</script>
