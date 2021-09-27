<template>
  <div class="mamad-postion">
    <v-card v-if="switchMap">
      <v-card-title>
        <span> مختصات جغرافیایی</span>
        <v-col>
          <v-radio-group row v-model="showInputs">
            <v-radio
              v-for="(item, index) in items"
              :key="index"
              :label="item.text"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-spacer />
        <!-- mamad : بروز رسانی این قسمت  -->
        <v-btn small color="success" light text @click="ok()">
          <v-icon small>fal fa-check</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <div
      id="map-wrap"
      class="mt-1 rounded"
      :style="fullscreen ? fullscreenStyle : defaultStyle"
      v-else
    >
      <Core
        :options="options"
        v-model="value"
        :addMarker="addMarker"
        :fullscreen="fullscreen"
        :disabledBtnAdd="disabledBtnAdd"
        :switchMap="switchMap"
        :removeMarker="removeMarker"
        :tooltips="tooltips"
        :connections="connections"
        :selectedMap="selectedMap"
        @switchMap="switchMap = $event"
        @updateFullscreen="fullscreen = $event"
      >
        <slot name="core"></slot>
      </Core>

      <MapSwitch :selectedMap="selectedMap" @changeMap="selectedMap = $event" />

      <!-- <MapTools v-model="distanceMode" /> -->
    </div>
  </div>
</template>

<script>
import Core from "./../utilities/map/Core.vue";
import MapSwitch from "./../utilities/map/MapSwitch.vue";

export default {
  components: {
    Core,
    MapSwitch,
  },

  props: {
    options: {
      default: () => {
        return {
          readonly: false,
          connect: false,
          count: 1,
          radar: 0,
          height: "90vh",
          zoom: 10,
          type: "polyline",
        };
      },
    },
    value: {
      default: () => [],
    },
    tooltips: {
      default: () => [],
    },
    connections: {
      default: () => [],
    },
    disabledBtnAdd: {
      default: () => false,
    },
  },

  watch: {
    switchMap(val) {
      if (val) {
        this.form = [...this.value];
        this.updated();
      }
    },
  },

  data() {
    return {
      defaultStyle: { height: this.options.height },
      fullscreen: false,
      fullscreenStyle: {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 10000,
      },
      selectedMap: "default",
      switchMap: false,
      form: [{ lat: "", lng: "" }],
      showInputs: "wgs84",
      items: [
        { value: "wgs84", text: "اعشاری" },
        { value: "utm", text: "UTM" },
        { value: "wgs90", text: "درجه ای" },
      ],
    };
  },

  methods: {
    ok() {
      this.switchMap = false;
    },
    selectInput(event) {
      this.showInputs = event;
    },
    removeMarker(index) {
      if (this.options.radar) {
        return this.$emit("input", []);
      }
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },
    addMarker(event) {
      if (this.value == null) this.value = [];

      if (this.options.readonly) return;

      if (this.options.count == 1 && this.value.length == 1) {
        this.$emit("input", [event.latlng]);
      } else {
        if (this.options.count > this.value.length)
          this.$emit("input", [...this.value, event.latlng]);
      }
      this.setdef = event.latlng;
    },
    updated() {
      this.$emit("input", this.form);
    },
  },
};
</script>

<style>
.mamad-select .v-text-field__details {
  display: none;
}
.v-speed-dial--right {
  right: 7px !important;
}
.v-speed-dial--bottom {
  bottom: 7px !important;
}
.map-speed-dial > .v-speed-dial__list {
  padding: 0px !important;
}
.map {
  border-radius: 10px;
}
.map-speed-dial {
  position: absolute !important;
}
.mamad-postion {
  position: relative !important;
}

.active .v-image .v-responsive__content {
  border-radius: 4px;
  border: 3px solid #3b8ed1;
}
.active p {
  color: #3b8ed1 !important;
}
.map-speed-dial > .v-speed-dial__list > div {
  margin-bottom: 10px;
}
.v-tooltip__content {
  z-index: 9000000 !important;
}
</style>
