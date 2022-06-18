/* eslint-disable no-unused-vars */
const fa = require("./../langs/fa");
const ar = require("./../langs/ar");
const en = require("./../langs/en");
import { get as getSafe } from "lodash";

let selectedLang = { lang: "ar" };

function translate(key, params = {}) {
  let message = getSafe(eval(selectedLang.lang).default, key, key);
  for (const param in params) {
    message = message.replace(`{${param}}`, params[param]);
  }
  return message;
}

export { translate, selectedLang };
