export default [
  {
    title: "نام کالا",
    field: "name",
    type: "text",
    isHeader: true,
    rules: ["required"],
    col: { md: 6 },
  },
  {
    title: "تصویر",
    field: "img",
    type: "cropper",
    isHeader: true,
    col: { md: 6 },
  },
  {
    title: "دسته بندی",
    field: "category_id",
    rel: {
      model: "Category",
    },
    type: "select",
    props: {
      "item-value": "id",
      "item-text": "name",
    },
    isHeader: true,
    rules: ["required"],
    col: { md: 6 },
  },
  {
    title: "واحد",
    field: "unit",
    type: "text",
    isHeader: true,
    rules: ["required"],
    col: { md: 6 },
  },
  {
    title: "قیمت پایه",
    field: "min_price",
    type: "text",
    props: {
      type: "number",
    },
    isHeader: true,
    rules: ["required"],
    col: { md: 6 },
  },
  {
    title: "تعداد موجود",
    field: "count",
    type: "text",
    props: {
      type: "number",
    },
    isHeader: true,
    default: 0,
    rules: ["required"],
    col: { md: 6 },
  },
  {
    title: "توضیحات",
    field: "description",
    type: "textarea",
    isHeader: true,
    col: { md: 12 },
  },
  {
    title: "در دسترس",
    field: "available",
    type: "switcher",
    isHeader: true,
    default: true,
    col: { md: 12 },
    inList(item) {
      return `<div class="white--text text-center pa-2 ${
        item ? "primary" : "error"
      }">${item ? "دردسترس" : "خارج از دسترس"}</div>`;
    },
  },
];
