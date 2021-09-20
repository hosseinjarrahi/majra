<template>
  <div></div>
  <!-- <editor
    :editor="editor"
    :value="value"
    @input="$emit('input', $event)"
    :config="options"
    class="col-12"
  /> -->
</template>

<script>
// import ck from "@ckeditor/ckeditor5-vue2";
// import editor from "@/plugins/ckeditor/ckeditor";

// export default {
//   components: { editor: ck.component },

//   props: {
//     value: { default: "" },
//     toolbar: { default: true }
//   },

//   created() {
//     if (!this.toolbar) this.options.toolbar = {};
//   },

//   data() {
//     return {
//       editor,
//       options: {
//         toolbar: {
//           items: [
//             "heading",
//             "|",
//             "underline",
//             "bold",
//             "italic",
//             "link",
//             "bulletedList",
//             "numberedList",
//             "superscript",
//             "subscript",
//             "strikethrough",
//             "specialCharacters",
//             "|",
//             "outdent",
//             "indent",
//             "alignment",
//             "pageBreak",
//             "|",
//             "imageInsert",
//             "blockQuote",
//             "insertTable",
//             "undo",
//             "redo",
//             "|",
//             "fontBackgroundColor",
//             "fontColor",
//             "fontFamily",
//             "highlight",
//             "fontSize",
//             "todoList",
//             "|",
//             "removeFormat",
//             "htmlEmbed"
//           ],
//           shouldNotGroupWhenFull: true
//         },
//         table: {
//           contentToolbar: [
//             "tableColumn",
//             "tableRow",
//             "mergeTableCells",
//             "tableProperties",
//             "tableCellProperties"
//           ]
//         },
//         language: "fa"
//       }
//     };
//   }
// };
</script>

<style>
.ck.ck-reset.ck-editor.ck-rounded-corners {
  z-index: 1 !important;
}
</style>
