<template>
  <v-app>
    <v-main>
      <DynamicTemplate />
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
