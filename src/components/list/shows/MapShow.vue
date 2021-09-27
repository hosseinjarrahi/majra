<template>
  <td class="col">
    <Map
      :options="{
        ...value.field.mapOptions,
        readonly: true,
        height: '40vh',
        icon:
          value.field.mapOptions && value.field.mapOptions.icon
            ? value.field.mapOptions.icon(item)
            : false,
      }"
      v-model="value.value"
    />
  </td>
</template>

<script>
import Map from "./../../utilities/Map";

export default {
  props: ["getFiles", "openImage", "value", "item"],
  components: { Map },
};
</script>

<style></style>
