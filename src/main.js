import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import HelpersPlugin from "./plugins/helpers";
import EventBusPlugin from "./plugins/eventBus";
import MajraFuncsPlugin from "./plugins/majraFuncs";

Vue.use(HelpersPlugin);
Vue.use(EventBusPlugin);
Vue.use(MajraFuncsPlugin);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
