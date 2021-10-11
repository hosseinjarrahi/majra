export default {
  install: function (Vue, options = { store: {}, configs: {} }) {
    let defaultConfigs = {
      WITH_KEY: true,
      FILTER_URL: "/filter",
      BASE_URL: "/",
    };

    Vue.prototype.$majra = {
      getSendKey(field) {
        return "sendKey" in field ? field.sendKey : field.field;
      },

      findField(field) {
        return options.store.getters["dynamic/findFieldWithKey"](field);
      },

      convertToSendForm(form) {
        let out = {};
        for (let fieldName in form) {
          let field = this.findField(fieldName);
          if (!field) continue;
          let key = this.getSendKey(field);
          out[key] = form[fieldName];
        }
        return out;
      },

      filterFieldsByShow(fields, mode = "create") {
        return fields.filter((field) => {
          if ("showIn" in field) {
            return field.showIn.indexOf(mode) > -1;
          }
          return true;
        });
      },

      hasChild(field) {
        return Vue.$helpers.hasProperty(field, "rel.child.model");
      },

      init(payload) {
        options.store.dispatch("dynamic/init", payload);
      },

      configs: {
        ...defaultConfigs,
        ...options.configs,
      },
    };

    Vue.$majra = Vue.prototype.$majra;
  },
};
