<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        <div class="d-flex flex-row">
          <v-btn
            v-if="isShowable('filter')"
            small
            color="primary"
            dark
            @click="openSearchBox()"
            elevation="0"
            max-width="30px"
            max-height="30px"
          >
            <v-icon size="18">mdi mdi-magnify</v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <slot name="header-btn"></slot>

        <v-tooltip bottom v-if="isShowable('delete') && showDeleteBtn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              small
              dark
              class="ml-3"
              color="error"
              @click="_event('deleteSelected')"
            >
              <v-icon size="18">mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Delete selected items") }}</span>
        </v-tooltip>

        <div
          class="
            d-flex
            flex-row
            align-center
            justify-center
            ml-3
            secondary
            rounded
          "
        >
          <v-tooltip v-if="isShowable('printer')" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                small
                elevation="0"
                text
                dark
                @click="printDialog = true"
              >
                <v-icon size="18">mdi-printer</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("print") }}</span>
          </v-tooltip>
          <v-tooltip v-if="isShowable('download')" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                text
                dark
                v-bind="attrs"
                v-on="on"
                :loading="loading[mainKey]"
                @click="csvDialog = true"
              >
                <v-icon size="18">mdi-download</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("Download") }}</span>
          </v-tooltip>
        </div>
        <v-tooltip v-if="isShowable('create')" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              small
              color="success"
              elevation="0"
              max-width="30px"
              max-height="30px"
              @click="_event('createBtn')"
            >
              <v-icon size="18">mdi mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Add") }}</span>
        </v-tooltip>

        <csv-dialog v-model="csvDialog" />
        <print-dialog v-model="printDialog" />
      </v-card-title>

      <v-card-text>
        <dynamic-filter :panel="panel" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CsvDialog from "./dialogs/CsvDialog";
import PrintDialog from "./dialogs/PrintDialog";
import DynamicFilter from "./DynamicFilter.vue";

export default {
  components: { CsvDialog, PrintDialog, DynamicFilter },

  created() {
    this._listen("multiDelete", (result) => {
      this.showDeleteBtn = result > 0;
    });
  },

  computed: {
    ...mapGetters({
      loading: "dynamic/loading",
      mainKey: "dynamic/mainKey",
      hiddenActions: "dynamic/hiddenActions",
    }),
  },

  data() {
    return {
      csvDialog: false,
      printDialog: false,
      panel: [],
      showDeleteBtn: false,
    };
  },

  methods: {
    isShowable(val) {
      return !(this.hiddenActions.indexOf(val) > -1);
    },
    openSearchBox() {
      if (typeof this.panel[0] == "undefined") this.panel = [0];
      else this.panel = [];
    },
  },
};
</script>
