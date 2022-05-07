import i18n from "./../plugins/i18n";

export default {
  required() {
    let message = i18n.t("validations.required");
    return (value) => {
      return (value && value.length > 1) || message;
    };
  },

  max(max = 5) {
    let message = i18n.t("validations.maxChar", { number: max });
    return (value) => (value && value.length <= max) || message;
  },

  min(min = 5) {
    let message = i18n.t("validations.minChar", { number: min });
    return (value) => (value && value.length >= min) || message;
  },

  email(message = i18n.t("validations.email")) {
    return (value) => /.+@.+\..+/.test(value) || message;
  },

  between(min = 5, max = 5) {
    let message = i18n.t("validations.charBetween", { min, max });
    return (value) =>
      (value && value.length >= min && value.length <= max) || message;
  },

  digits(number = 11, message = i18n.t("validations.digits"), phone) {
    if (phone) {
      return (value) =>
        (value && value.length === number && /09\d{9}/.test(value)) || message;
    }
    return (value) => (value && value.length === number) || message;
  },

  phone() {
    let message = i18n.t("validations.phone");
    return this.digits(11, message, true);
  },

  same(conf, message) {
    return (value) => value === conf || message;
  },

  getValidation(name, args) {
    return this[name](args);
  },
};
