import Vue from "vue";
import VueI18n from "vue-i18n";
import fa from "./../langs/fa";
Vue.use(VueI18n);

export default new VueI18n({
  locale: "fa",
  messages: { fa },
});
