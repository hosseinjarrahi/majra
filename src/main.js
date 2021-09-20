import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import {
  EventBus,
  _event,
  _listen,
  _log,
  _resetEvLi,
  _runAfterPageChanged,
  _runAfterPageLoaded,
  _runBeforeTemplateInit,
} from "./plugins/eventBus";

//////////////

Vue.mixin({
  data: () => ({
    baseURL: "/",
    bus: EventBus,
  }),
  methods: {
    _event,
    _listen,
    _log,
    _resetEvLi,
    _runAfterPageChanged,
    _runAfterPageLoaded,
    _runBeforeTemplateInit,
  },
});
///////////////////////

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
