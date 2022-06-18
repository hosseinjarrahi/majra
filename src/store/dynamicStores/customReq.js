import Vue from "vue";
import { translate } from "./../../helpers/tr";

const actions = {
  customAdd({ state, commit, dispatch }, payload) {
    commit("setLoading", { key: payload.key, value: true });

    let route = payload.route ? payload.route : state.routes[payload.key];

    let sendForm = Vue.$majra.convertToSendForm(payload.form, payload.fields);

    let data = Vue.$majra.configs.WITH_KEY
      ? { [payload.key]: sendForm }
      : sendForm;

    Vue.axios
      .post(route, data)
      .then((response) => {
        let newItems = Array.isArray(response.data[payload.key])
          ? response.data[payload.key]
          : [response.data[payload.key]];
        !payload.reload && commit("add", newItems);
        payload.reload && dispatch("reloadMainData");
        Vue._event("alert", {
          text: translate("Successfully registered"),
          color: "green",
        });
        Vue._event("handleDialogForm", false);
      })
      .catch((error) => {
        Vue._event("alert", {
          text: error.response.data.message,
          color: "red",
        });
      })
      .finally(() => {
        commit("setLoading", { key: payload.key, value: false });
      });
  },

  customEdit({ state, commit, dispatch }, payload) {
    let route = payload.route ? payload.route : state.routes[payload.key];

    let sendForm = Vue.$majra.convertToSendForm(payload.form, payload.fields);

    let data = Vue.$majra.configs.WITH_KEY
      ? { [payload.key]: sendForm }
      : sendForm;

    Vue.axios
      .patch(route + "/" + payload.form.id, data)
      .then((response) => {
        commit("editItem", response.data[payload.key]);
        Vue._event("alert", {
          text: translate("Edited successfully"),
          color: "green",
        });
        payload.reload && dispatch("get", { key: payload.key });
      })
      .catch((error) => {
        Vue._event("alert", {
          text: error.response.data.message,
          color: "red",
        });
      });
  },
};

export default {
  actions,
};
