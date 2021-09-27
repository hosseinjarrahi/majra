import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
require("./plugins/helpers")
require("./plugins/eventBus")

//////////////
Vue.mixin({
  data: () => ({
    baseURL: "/",
  })
});
///////////////////////

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
