import Vue from "vue";

export let HelpersPlugin = {
  install: function (Vue) {
    Vue.prototype.$majra = {
      getSendKey(field) {
        return "sendKey" in field ? field.sendKey : field.field;
      },
    };
  },
};

Vue.use(HelpersPlugin);
