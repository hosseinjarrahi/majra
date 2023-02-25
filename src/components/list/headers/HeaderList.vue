<template>
  <div
    :class="
      typeof header.class == 'object' && 'header' in header.class
        ? header.class.header
        : []
    "
    :style="
      typeof header.style == 'object' && 'header' in header.style
        ? header.style.header
        : []
    "
  >
    <component
      :header="header"
      :send-key="header.sendKey ? header.sendKey : header.value"
      :is="map[header.type]"
      :runAfterChange="runAfterChange"
    ></component>
  </div>
</template>

<script>
const DateHeader = () => import("./DateHeader.vue");
const DefaultHeader = () => import("./DefaultHeader.vue");
const SelectHeader = () => import("./SelectHeader.vue");
const SwitcherHeader = () => import("./SwitcherHeader.vue");
const HasHeader = () => import("./hasHeader.vue");

export default {
  props: ["header", "runAfterChange"],

  data: () => ({
    map: {
      date: DateHeader,
      select: SelectHeader,
      combo: SelectHeader,
      text: DefaultHeader,
      textarea: DefaultHeader,
      file: DefaultHeader,
      cropper: DefaultHeader,
      time: DefaultHeader,
      number: DefaultHeader,
      switcher: SwitcherHeader,
      has: HasHeader,
    },
  }),
};
</script>
