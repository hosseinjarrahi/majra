<template>
  <div
    id="map-wrap"
    class="mt-1 rounded"
    :style="fullscreen ? fullscreenStyle : defaultStyle"
  >
    <Core
      :options="options"
      v-model="value"
      :addMarker="addMarker"
      :fullscreen="fullscreen"
      :removeMarker="removeMarker"
      @updateFullscreen="fullscreen = $event"
    >
      <slot name="core"></slot>
    </Core>
  </div>
</template>

<script>
import Core from "./../utilities/map/Core.vue";

export default {
  components: {
    Core,
  },

  props: {
    options: {
      default: () => {
        return {
          readonly: false,
          count: 1,
          height: "50vh",
          zoom: 10,
        };
      },
    },
    value: {
      default: () => [],
    },
    disabledBtnAdd: {
      default: () => false,
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
      form: [{ lat: "", lng: "" }],
    };
  },

  methods: {
    removeMarker(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },
    addMarker(event) {
      if (this.value == null) this.value = [];

      if (this.options.readonly) return;

      if (this.options.count === 1 && this.value.length === 1) {
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
.map {
  border-radius: 10px;
}
</style>
