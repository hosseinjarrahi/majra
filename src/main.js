import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import HelpersPlugin from "./plugins/helpers";
import EventBusPlugin from "./plugins/eventBus";
import MajraFuncsPlugin from "./plugins/majraFuncs";
import Axios from "./plugins/axios";
import i18n from "./plugins/i18n";

Vue.use(HelpersPlugin);
Vue.use(EventBusPlugin);
Vue.use(Axios, { baseURL: "http://localhost:8000/api" });
Vue.use(MajraFuncsPlugin, { store, configs: {} });

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
