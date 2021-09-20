<template>
  <l-map
    ref="map"
    class="map elevation-2"
    v-resize="onResize"
    :zoom="options.zoom ? options.zoom : 10"
    :center="Array.isArray(value) && value.length > 0 ? value[0] : setdef"
    @click="addMarker($event)"
    style="z-index: 1"
    @update:zoom="changeIconSize"
    @update:center="updateCenter"
    @mousemove="updateMouse"
    @polylinemeasure:toggle="handleToggle"
    :options="{
      preferCanvas: true,
    }"
  >
    <slot></slot>

    <v-btn
      icon
      @click.stop="[$emit('updateFullscreen', !fullscreen), onResize()]"
      style="position: absolute; top: 0; right: 0; z-index: 1000"
    >
      <v-icon v-if="fullscreen">mdi-fullscreen-exit</v-icon>
      <v-icon v-else>mdi-fullscreen</v-icon>
    </v-btn>

    <div
      class="text-center d-flex justify-center"
      style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 1000"
    >
      <div
        class="pa-1 white-panel rounded elevation-5"
        style="position:relative:;backdrop-filter: blur(10px);"
        @click.stop="() => []"
        @dblclick.stop="() => []"
        @drag.stop="() => []"
        @dragend.stop="() => []"
        @dragenter.stop="() => []"
        @dragover.stop="() => []"
        @dragstart.stop="() => []"
        @durationchange.stop="() => []"
      >
        <div>
          <span>{{ mouseCoords }}</span>
          <v-btn small icon @click="showAddManual = !showAddManual">
            <v-icon size="18" v-if="showAddManual">fal fa-chevron-down</v-icon>
            <v-icon size="18" v-else>fal fa-chevron-up</v-icon>
          </v-btn>
        </div>

        <v-expand-transition>
          <div class="d-flex align-center flex-row" v-if="showAddManual">
            <div class="col-12 col-lg-5">
              <v-text-field
                hide-details
                outlined
                dense
                type="number"
                label="lat"
                :value="setdef2.lat"
                @input="[(setdef2.lat = +$event), (setdef2 = { ...setdef2 })]"
              />
            </div>
            <div class="col-12 col-lg-5">
              <v-text-field
                hide-details
                outlined
                dense
                type="number"
                label="lng"
                :value="setdef2.lng"
                @input="[(setdef2.lng = +$event), (setdef2 = { ...setdef2 })]"
              />
            </div>
            <div class="col">
              <v-btn small icon @click="setdef = { ...setdef2 }">
                <v-icon>fal fa-check</v-icon>
              </v-btn>
            </div>
            <div class="col">
              <v-btn small icon @click="addMarker({ latlng: setdef2 })">
                <v-icon>fal fa-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </v-expand-transition>
      </div>
    </div>

    <l-marker
      @click="setdef2 = { ...setdef }"
      :lat-lng="setdef"
      v-if="showAddManual"
    >
      <l-icon :icon-size="iconSize" :icon-anchor="iconAnchor">
        <img
          :src="defaultIcon"
          :style="{
            width: defIconSize[0] + 'px',
            height: defIconSize[1] + 'px',
          }"
          style="opacity: 0.5"
        />
      </l-icon>
    </l-marker>

    <!-- <l-control-polyline-measure :options="measureOptions" position="topleft" /> -->

    <v-tooltip v-if="!disabledBtnAdd" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          v-show="!fullscreen"
          small
          fab
          @click.stop="$emit('switchMap', true)"
          style="position: absolute; bottom: 7px; left: 7px; z-index: 1000"
        >
          <v-icon>fal fa-plus</v-icon>
        </v-btn>
      </template>
      <span>افزودن مختصات</span>
    </v-tooltip>

    <l-tile-layer :url="url" :options="{ maxZoom: 20 }"></l-tile-layer>

    <template v-if="options.type == 'circle'">
      <l-circle
        v-for="(marker, index) in value"
        :key="index + 'circle'"
        :lat-lng="marker"
        :color="marker.color ? marker.color : 'green'"
        :fillColor="marker.color ? marker.color : 'green'"
        :radius="
          (marker.radius !== null && marker.radius) || marker.radius === 0
            ? +marker.radius
            : (marker.radius = 2000)
        "
        @click.right="options.readonly ? '' : removeMarker(index)"
      >
        <l-popup v-if="tooltips[index]" :content="tooltips[index]"></l-popup>
      </l-circle>
    </template>

    <l-marker
      v-for="(marker, index) in value"
      :key="index"
      :lat-lng="marker"
      @click.right="options.readonly ? '' : removeMarker(index)"
    >
      <l-icon :icon-size="iconSize" :icon-anchor="iconAnchor">
        <img
          :src="icon"
          :style="{
            width: iconSize[0] + 'px',
            height: iconSize[1] + 'px',
          }"
        />
      </l-icon>
      <l-popup v-if="tooltips[index]" :content="tooltips[index]"></l-popup>
    </l-marker>

    <div v-if="options.type == 'polyline'">
      <l-polyline
        v-if="!connections.length && options.connect"
        :lat-lngs="value"
        :opacity="0.5"
      />

      <l-polyline
        v-for="(connection, index) in connections"
        :key="index + Math.random()"
        :lat-lngs="connection"
        :opacity="0.5"
      />
      <!-- 
      <v-polyline-decorator
        v-if="!connections.length && options.connect && test == true"
        :paths="[value]"
        :patterns="patterns"
      /> -->
    </div>

    <div v-if="options.type == 'polygon'">
      <l-polygon :lat-lngs="value"></l-polygon>
    </div>
  </l-map>
</template>

<script>
// import Vue2LeafletPolylineDecorator from "vue2-leaflet-polylinedecorator";
import L from "leaflet";
// import LControlPolylineMeasure from "vue2-leaflet-polyline-measure";

export default {
  components: {
    // "v-polyline-decorator": Vue2LeafletPolylineDecorator,
    // LControlPolylineMeasure
  },

  props: [
    "options",
    "value",
    "addMarker",
    "fullscreen",
    "disabledBtnAdd",
    "switchMap",
    "removeMarker",
    "tooltips",
    "connections",
    "selectedMap",
  ],

  created() {
    if (this.value == null) this.value = [];

    Array.isArray(this.value) ? this.value : this.$emit("input", [this.value]);

    Array.isArray(this.value)
      ? this.$emit(
          "input",
          this.value.filter((i) => !!i)
        )
      : this.value;

    this.$emit("input", [...this.value]);

    if (this.value.length > 1) {
      this.setdef = this.value[0];
    }
  },

  data: () => {
    return {
      showAddManual: false,
      test: true,
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      defIconSize: [32, 37],
      defIconAnchor: [16, 37],
      maps: {
        default: "/tile/osm_tile/{z}/{x}/{y}.png",
        satellite: "/tile/google_satellite_tile/{z}/{x}/{y}.png",
        hybrid: "/tile/google_hybrid_tile/{z}/{x}/{y}.jpg",
      },
      mousePos: "",
      setdef: { lat: 35.6892, lng: 51.389 },
      setdef2: { lat: 35.6892, lng: 51.389 },
      patterns: [
        {
          offset: 12,
          repeat: 100,
          symbol: L.Symbol.arrowHead({
            pixelSize: 15,
            pathOptions: { fillOpacity: 1, weight: 0 },
          }),
        },
        { offset: 0, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 0 }) },
      ],
      measureOptions: {
        showUnitControl: true,
        tooltipTextFinish:
          "<b>برای اتمام اندازه گیری روی نقطه اخر کلیک کنید</b><br><br>",
        tooltipTextDelete: "<b>shift + click = حذف نقطه </b> <br><br>",
        tooltipTextMove: "<b>برای جابه جایی، نقاط را بکشید</b><br><br>",
        tooltipTextResume:
          "<b>Ctrl + Click = افزودن نقطه در بین خطوط </b> <br><br>",
        tooltipTextAdd: "<b>Ctrl + Click = افزودن نقطه</b> <br><br>",
        measureControlTitleOn: "فعال کردن اندازه گیری", // Title for the control going to be switched on
        measureControlTitleOff: "غیر فعال کردن اندازه گیری", // Title for the control going to be switched off
      },
    };
  },

  computed: {
    url() {
      return this.baseURL + this.maps[this.selectedMap];
    },
    defaultIcon() {
      return `/markers/default.png`;
    },
    icon() {
      if (typeof this.options.icon == "function") return this.defaultIcon;
      return this.options.icon ? this.options.icon : this.defaultIcon;
    },
    mouseCoords() {
      if (!this.mousePos.lat) return "";

      return (
        Math.round((this.mousePos.lat + Number.EPSILON) * 100000) / 100000 +
        " - " +
        Math.round((this.mousePos.lng + Number.EPSILON) * 100000) / 100000
      );
    },
  },

  methods: {
    updateCenter(event) {
      setTimeout(() => {
        this.test = !this.test;
      }, 1);
      this.test = !this.test;
      this.setdef = event;
    },
    onResize() {
      this.$refs.map.mapObject._onResize();
      this.$forceUpdate();
    },
    changeIconSize(val) {
      this.iconSize = [
        this.defIconSize[0] * (val / 10),
        this.defIconSize[1] * (val / 10),
      ];
      this.iconAnchor = [
        this.defIconAnchor[0] * (val / 10),
        this.defIconAnchor[1] * (val / 10),
      ];
    },
    updateMouse(event) {
      this.mousePos = event.latlng;
    },
  },
};
</script>

<style></style>
