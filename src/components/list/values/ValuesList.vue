<template>
  <div @click.ctrl="_event('addToSelected', item)" @click.exact="onClick">
    <template v-if="'inList' in field">
      <div v-html="render()" />
    </template>
    <template v-else>
      <component
        :class="
          typeof field.class == 'object' && 'list' in field.class
            ? field.class.list
            : []
        "
        :item="item[field.field]"
        :field="field"
        :key="'selectValue' + field.field"
        :is="map[field.type]"
      ></component>
    </template>
  </div>
</template>

<script>
const DateValue = () => import("./DateValue.vue");
const fileValue = () => import("./FileValue.vue");
const SelectValue = () => import("./SelectValue.vue");
const TextValue = () => import("./TextValue.vue");

export default {
  components: { fileValue, DateValue, SelectValue, TextValue },

  props: ["field", "item"],

  data() {
    return {
      map: {
        text: "TextValue",
        textarea: "TextValue",
        combo: "SelectValue",
        select: "SelectValue",
        file: "fileValue",
        date: "DateValue",
        time: "TextValue",
        number: "TextValue",
        switcher: "SelectValue",
      },
    };
  },

  methods: {
    render() {
      let fn = this.field.inList.bind(this);

      return fn(this.item[this.field.field], this.item, this.field);
    },
    onClick() {
      return "onClick" in this.field
        ? this.field.onClick(this.item, this.field, this)
        : null;
    },
  },
};
</script>

<style></style>
