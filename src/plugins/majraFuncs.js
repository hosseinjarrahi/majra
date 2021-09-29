import Vue from "vue";

export let MajraFuncs = {
  install: function (Vue, { configs }) {
    let defaultConfigs = {
      UPLOAD_PATH: "/upload",
      WITH_KEY: true,
    };
    Vue.prototype.$majra = {
      getSendKey(field) {
        return "sendKey" in field ? field.sendKey : field.field;
      },
      configs: {
        ...defaultConfigs,
        ...configs,
      },
    };
    Vue.$majra = Vue.prototype.$majra;
  },
};

Vue.use(MajraFuncs);
