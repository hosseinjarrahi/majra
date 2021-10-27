<template>
  <v-app>
    <v-main>
      <DynamicTemplate>
        <template v-slot:card="item">
          {{ item }}
        </template>
      </DynamicTemplate>
    </v-main>
  </v-app>
</template>

<script>
import DynamicTemplate from "./components/DynamicTemplate";
import exampleFields from "./exampleFields";

export default {
  name: "App",

  components: {
    DynamicTemplate,
  },

  beforeCreate() {
    this.$majra.init({
      mainRoute: "/product",
      options: {
        listType: "card",
        cardSize: 4,
      },
      relations: [
        { route: "/Option=>Product?is_option=1", key: "Option" },
        "/menu",
        "/base",
      ],
      fields: exampleFields,
    });
  },
};
</script>
