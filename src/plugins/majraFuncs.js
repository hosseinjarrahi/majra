export default {
  install: function (Vue, options = {configs: {}}) {
    let defaultConfigs = {
      UPLOAD_PATH: "/upload",
      WITH_KEY: true,
      BASE_URL: "/",
    };
    
    Vue.prototype.$majra = {
      getSendKey(field) {
        return "sendKey" in field ? field.sendKey : field.field;
      },
      
      filterFieldsByShow(fields, mode = 'create') {
        return fields.filter((field) => {
          if ("showIn" in field) {
            return field.showIn.indexOf(mode) > -1
          }
          return true;
        });
      },
      
      hasChild(field) {
        return Vue.$helpers.hasProperty(field, 'rel.child.model')
      },
      
      configs: {
        ...defaultConfigs,
        ...options.configs,
      },
    };
    
    Vue.$majra = Vue.prototype.$majra;
  },
};
