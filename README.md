<div align="center">
    <img src="https://user-images.githubusercontent.com/37629053/136436193-098d6531-570c-4d67-9b6a-bb881bf063c0.png" alt="majra">
</div>
<p align="center">
    <img src="https://img.shields.io/badge/vue.js-2.6-green" alt="vue">
    <img src="https://img.shields.io/badge/vuetify-2.5-blue" alt="vue">
</p>

<h2 align="center">
 🎯 Just focus on your logic
</p>

## About Majra

Majra is a tool for quickly creating CRUD UI & forms.
Make your components reusable by majra.

- Powerful form generator
- Lots of ready fields
- Simplicity in usage
- Extendable
- static friendly

## Install Majra

```shell
npm i --save majra
```

in vue applications

```js
import Vue from "vue";
import Majra from "majra";

Vue.use(Majra, {
  store, // your store instance
  configs: {},
});
```

in nuxt applications

```js
import Vue from "vue";
import Majra from "majra";

export default async ({ store }) => {
  Vue.use(Majra, {
    store,
    configs: {},
  });
};
```

## Usage

simple example

```vue
<template>
  <DynamicTemplate />
</template>

<script>
import { DynamicTemplate } from "majra";

export default {
  components: {
    DynamicTemplate,
  },

  beforeCreate() {
    this.$majra.init({
      mainRoute: "/product",
      relations: [{ route: "/get-menus-list", key: "Menu" }],
      fields: [
        {
          title: "Product name", // title of field that shows in form and table
          field: "name", // the key of data
          type: "text", // type of field (uses majra textField)
          isHeader: true, // show this field in table
        },
        {
          title: "Menu",
          field: "menu",
          sendKey: "menu_id", // you can change your key when sending the form by sendKey
          type: "select",
          rel: {
            model: "Menu", // the key of data that returns from api call
          },
          props: {
            "item-text": "title",
            "item-value": "id",
          },
          isHeader: true,
        },
      ],
    });
  },
};
</script>
```

<div align="center">
    <img width="600" src="https://user-images.githubusercontent.com/37629053/136450704-61316d64-5185-437e-92dc-df5309804d8d.png" />
</div>

You can also use the form builder

```vue
<template>
  <DynamicForm :form="form" :fields="fields" />
</template>

<script>
import { DynamicForm } from "majra";

export default {
  components: {
    DynamicForm,
  },
  data: () => ({
    fields: [
      {
        title: "Product name",
        field: "name",
        type: "text",
      },
      {
        title: "Menu",
        field: "menu",
        sendKey: "menu_id",
        type: "select",
        rel: {
          model: "Menu", // the key of data that returns from api call
        },
        props: {
          "item-text": "title",
          "item-value": "id",
        },
      },
    ],
  }),
};
</script>
```

## Make your field

Just import your component and use it

```js
import YourTextField from "./YourTextField.vue";

export default {
  beforeCreate() {
    this.$majra.init({
      mainRoute: "/product",
      fields: [
        {
          title: "Product name",
          field: "name",
          type: "text",
          component: YourTextField, // this field will replace by YourField
          isHeader: true,
        },
      ],
    });
  },
};
```

## How create a field

jsut extend AbstractField from majra and make your field, when you extend AbstractField then necessary data and methods will be available.

```vue
<template>
  <div>
    <input :value="value" @input="updateField($event)"/>
  <div>
</template>

<script>
  import {AbstractField} from 'majra';

  export default {
    extends: AbstractField,
  }
</script>
```

## License

The Majra is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
