<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    scrollable
    content-class="fill-height"
    :fullscreen="printMode"
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
        <v-btn dark text @click="print">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-btn dark text @click="_event('handleShowDialog', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text :class="printMode ? 'pt-0' : 'pt-5'">
        <slot v-bind="showItem">
          <v-row justify="center" align="center">
            <v-col
              :cols="printMode || $vuetify.breakpoint.mdAndDown ? 12 : 8"
              :class="
                printMode || $vuetify.breakpoint.mdAndDown
                  ? ''
                  : 'white elevation-2'
              "
              class="rounded pa-0"
            >
              <table class="col-12" style="border-collapse: collapse">
                <tbody v-if="$vuetify.breakpoint.mdAndUp" class="pa-0">
                  <tr v-for="(value, key) in item" :key="key">
                    <slot
                      v-bind="{ items: item, item: value }"
                      :name="'item.' + value.field.field"
                    >
                      <td class="pa-2 font-weight-bold">
                        {{ value.field.title }}
                      </td>
                      <td class="pa-2" style="width: 80%">
                        <component
                          :is="map[value.field.type]"
                          :getValue="getValue"
                          :getFiles="getFiles"
                          :openImage="openImage"
                          :value="value"
                          :item="item"
                          class="pa-2 w-100"
                        />
                      </td>
                    </slot>
                  </tr>
                </tbody>
                <tbody v-else class="pa-0 text-center">
                  <template v-for="(value, key) in item">
                    <div
                      class="d-flex align-center flex-column my-1 rounded-lg"
                      :key="key"
                      style="border: 1px solid darkgray"
                    >
                      <div class="pa-2 font-weight-bold rounded-lg">
                        {{ value.field.title }}
                      </div>
                      <v-divider />
                      <div class="pa-2" style="width: 80%">
                        <component
                          :is="map[value.field.type]"
                          :getValue="getValue"
                          :getFiles="getFiles"
                          :openImage="openImage"
                          :value="value"
                          :item="item"
                          class="pa-2 w-100"
                        />
                      </div>
                    </div>
                  </template>
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

const Map = () => import("./../utilities/Map");
const Editor = () => import("./../utilities/Editor.vue");
const DefaultShow = () => import("../list/shows/DefaultShow.vue");
const EditorShow = () => import("../list/shows/EditorShow.vue");
const FileShow = () => import("../list/shows/FileShow.vue");
const MapShow = () => import("../list/shows/MapShow.vue");

export default {
  components: { Map, Editor },

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
        if (field.type == "file" && this.$helpers.isImage(val[property]))
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
        date: DefaultShow,
        select: DefaultShow,
        combo: DefaultShow,
        text: DefaultShow,
        textarea: DefaultShow,
        file: FileShow,
        ckeditor: EditorShow,
        time: DefaultShow,
        number: DefaultShow,
        switcher: DefaultShow,
        map: MapShow,
      },
    };
  },

  computed: {
    ...mapGetters({
      findFieldWithKey: "dynamic/findFieldWithKey",
    }),
  },

  methods: {
    getValue(value) {
      if (value.field.type === "date")
        return this.$helpers.persianDate(value.value);

      if (value.field.type === "ckeditor") return value.value;

      if (value.field.type === "map") return value.value;

      if (value.field.type === "select" && value.field.values) {
        for (const item of value.field.values) {
          if (item.value == value.value) return item.text;
        }
      }

      return value.value && typeof value.value === "object"
        ? Array.isArray(value.value)
          ? this.getArrayValues(value)
          : this.$helpers.getSafe(
              value.field,
              "props.item-text",
              this.getObject(value.value)
            )
        : value.value;
    },
    getObject() {},
    getArrayValues({ value, field }) {
      if (this.$helpers.isArrayOfObjects(value)) {
        return value
          .map(
            (v) => v[this.$helpers.getSafe(field, "props.item-text", "text")]
          )
          .join(" , ");
      }
      return value.join(",");
    },
    getFiles(value) {
      let out = (Array.isArray(value) ? value : [value]).filter(
        (v) => !!v && v != "null"
      );
      return out.map((img) => this.$majra.configs.BASE_URL + img);
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

<style scoped>
td:not(td:last-child) {
  border-left: 1px solid darkgray;
}
</style>
