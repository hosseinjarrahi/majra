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
      time: DefaultHeader,
      number: DefaultHeader,
      switcher: SwitcherHeader,
    },
  }),
};
</script>
