<template>
  <v-app>
    <v-main>
      <DynamicTemplate />
    </v-main>
  </v-app>
</template>

<script>
import DynamicTemplate from "./components/DynamicTemplate";

export default {
  name: "App",

  components: {
    DynamicTemplate,
  },

  created() {
    this.$majra.init({
      mainRoute: "/admin/base",
      relations: ["/admin/product"],
      fields: [
        {
          title: "Base",
          field: "base_id",
          rel: {
            model: "Base",
            child: {
              model: "Product",
              ownKey: "base",
            },
          },
          item_text: "name",
          item_value: "id",
          sendKey: "x",
          type: "select",
        },
        {
          title: "Product",
          field: "img",
          type: "select",
          rel: {
            model: "Product",
          },
          item_text: "order",
          item_value: "id",
          needFilter: true,
        },
      ],
    });
  },
};
</script>
