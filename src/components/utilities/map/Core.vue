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
  >
    <v-btn
      icon
      @click.stop="[$emit('updateFullscreen', !fullscreen), onResize()]"
      style="position: absolute; top: 0; right: 0; z-index: 1000"
    >
      <v-icon v-if="fullscreen">mdi-fullscreen-exit</v-icon>
      <v-icon v-else>mdi-fullscreen</v-icon>
    </v-btn>

    <l-tile-layer :url="url" :options="{ maxZoom: 20 }"></l-tile-layer>

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
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: ["options", "value", "addMarker", "fullscreen", "removeMarker"],

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },

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
      test: true,
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      defIconSize: [32, 37],
      defIconAnchor: [16, 37],
      setdef: { lat: 35.6892, lng: 51.389 },
      setdef2: { lat: 35.6892, lng: 51.389 },
    };
  },

  computed: {
    url() {
      return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    },
    icon() {
      return "data:image/png;base64,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";
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
  },
};
</script>
