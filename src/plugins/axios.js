import Axios from "axios";

export default {
  install: function (Vue, options = {}) {
    const axiosDefaultConfig = {
      baseURL: '/',
    };
    Vue.prototype.axios = Axios.create({...axiosDefaultConfig, ...options});
    Vue.axios = Vue.prototype.axios;
  },
};
