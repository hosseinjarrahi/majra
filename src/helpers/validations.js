import { translate } from "./../helpers/tr";

export default {
  required() {
    let message = translate("validations.required");
    return (value) => {
      return (value && value.length > 1) || message;
    };
  },

  max(max = 5) {
    let message = translate("validations.maxChar", { number: max });
    return (value) => (value && value.length <= max) || message;
  },

  min(min = 5) {
    let message = translate("validations.minChar", { number: min });
    return (value) => (value && value.length >= min) || message;
  },

  email(message = translate("validations.email")) {
    return (value) => /.+@.+\..+/.test(value) || message;
  },

  between(min = 5, max = 5) {
    let message = translate("validations.charBetween", { min, max });
    return (value) =>
      (value && value.length >= min && value.length <= max) || message;
  },

  digits(number = 11, message = translate("validations.digits"), phone) {
    if (phone) {
      return (value) =>
        (value && value.length === number && /09\d{9}/.test(value)) || message;
    }
    return (value) => (value && value.length === number) || message;
  },

  phone() {
    let message = translate("validations.phone");
    return this.digits(11, message, true);
  },

  same(conf, message) {
    return (value) => value === conf || message;
  },

  getValidation(name, args) {
    return this[name](args);
  },
};
