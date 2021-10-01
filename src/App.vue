<template>
  <v-app>
    <v-main>
      <DynamicForm :fields="fields" />
    </v-main>
  </v-app>
</template>

<script>
// import DynamicTemplate from "./components/DynamicTemplate.vue";
// import Ckeditor from "./components/fields/Ckeditor";

import DynamicForm from "./components/DynamicForm";
export default {
  name: "App",

  components: {
    DynamicForm,
  },

  data: () => ({
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
        col: { md: 12 },
      },
    ],
  }),

  created() {
    this.$majra.init({
      mainRoute: "/admin/base",
      relations: ["/admin/product"],
      fields: [],
    });
  },
};
</script>
