import Vue from "vue";

export let MajraFuncs = {
  install: function (Vue) {
    Vue.prototype.$majra = {
      getSendKey(field) {
        return "sendKey" in field ? field.sendKey : field.field;
      },
    };
    Vue.$majra = Vue.prototype.$majra;
  },
};

Vue.use(MajraFuncs);
