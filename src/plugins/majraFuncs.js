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

      findField(field, fields = false) {
        if (fields) {
          return fields.filter((f) => f.field === field)[0];
        }
        return options.store.getters["dynamic/findFieldWithKey"](field);
      },

      convertToSendForm(form, fields = false) {
        if (!fields) return form;
        let out = {};
        for (let fieldName in form) {
          let field = this.findField(fieldName, fields);
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

      setOptions(payload) {
        options.store.commit("dynamic/setOptions", payload);
      },

      editReq(payload) {
        options.store.dispatch("dynamic/customEdit", payload);
      },

      addReq(payload) {
        options.store.dispatch("dynamic/customAdd", payload);
      },

      getItem(payload) {
        return options.store.getters["dynamic/getItemsWithKey"](payload);
      },

      configs: {
        ...defaultConfigs,
        ...options.configs,
      },
    };

    Vue.$majra = Vue.prototype.$majra;
  },
};
