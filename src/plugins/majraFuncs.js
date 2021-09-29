export default {
  install: function (Vue, { configs }) {
    let defaultConfigs = {
      UPLOAD_PATH: "/upload",
      WITH_KEY: true,
      BASE_URL: "/",
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
