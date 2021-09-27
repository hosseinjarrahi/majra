<template>
  <v-app>
    <v-main>
      <DynamicTemplate />
    </v-main>
  </v-app>
</template>

<script>
import DynamicTemplate from "./components/DynamicTemplate.vue";

export default {
  name: "App",

  components: {
    DynamicTemplate,
  },

  created() {
    this.$store.dispatch("dynamic/init", {
      mainRoute: "/admin/form",
      relations: [
        { route: "/admin/user-no-form", key: "User" },
        { route: "/admin/all-forms", key: "AllForm" },
        "/admin/product",
        "/admin/base",
      ],
      fields: [
        {
          title: "نام فرم",
          field: "name",
          rel: false,
          type: "cropper",
          isHeader: true,
          col: { md: 12 },
        },
        {
          title: "توضیحات",
          field: "description",
          rel: false,
          type: "textarea",
          isHeader: true,
          col: { md: 12 },
        },
      ],
    });
  },
};
</script>
