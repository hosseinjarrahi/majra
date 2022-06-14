import Vue from "vue";
import VueI18n from "vue-i18n";
import fa from "./../langs/fa";
Vue.use(VueI18n);

let i18n = new VueI18n({
  locale: "fa",
  messages: { fa },
});

Vue.prototype.translate = async (args) => {
  let t = await i18n.t(args);
  return t;
};

Vue.translate = async (args) => {
  let t = await i18n.t(args);
  return t;
};

export { i18n };
