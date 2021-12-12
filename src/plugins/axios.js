import Axios from "axios";

export default {
  install: function (Vue, options = {}) {
    if (options.instance) {
      Vue.prototype.axios = options.instance;
      Vue.axios = Vue.prototype.axios;
      return;
    }
    const axiosDefaultConfig = {
      baseURL: "/",
    };
    Vue.prototype.axios = Axios.create({ ...axiosDefaultConfig, ...options });
    Vue.axios = Vue.prototype.axios;
  },
};
