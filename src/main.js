import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import HelpersPlugin from "./plugins/helpers";
import EventBusPlugin from "./plugins/eventBus";
import MajraFuncsPlugin from "./plugins/majraFuncs";
import Axios from "./plugins/axios";
import { translate, selectedLang } from "./helpers/tr";

selectedLang.lang = "en";

Vue.use(HelpersPlugin);
Vue.use(EventBusPlugin);
Vue.use(Axios, { baseURL: "http://localhost:8000/api" });
Vue.use(MajraFuncsPlugin, { store, configs: {} });

Vue.prototype.translate = translate;
Vue.translate = translate;

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
