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
      mainRoute: "/admin/base",
      relations: ["/admin/category"],
      fields: exampleFields,
    });
  },
};
</script>
