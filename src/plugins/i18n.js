import Vue from "vue";
import VueI18n from "vue-i18n";
import fa from "./../langs/fa";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en", // set locale
  fallbackLocale: "fa", // set fallback locale
  messages: { fa }, // set locale messages
});

export default i18n;
