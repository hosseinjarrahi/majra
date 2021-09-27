import { toPascalCase } from "@/helpers/case";
import validations from "@/helpers/validations";
import Vue from 'vue'
const axios = require("axios");

const state = {
  items: [],
  loading: {},
  options: {},
  pagination: {
    currentPage: 1,
    total: 0,
  },
  routes: [],
  mainKey: false,
  hiddenActions: [],
  fields: [],
  flatFields: [],
  backup: false,
  headers: [],
  permission: {},
  relationsFeched: false,
  showEdit: true,
  showDelete: true,
  reloadAfterSave: false,
};

/*******************************************************/
const getters = {
  showEdit: (state) => state.showEdit,
  showDelete: (state) => state.showDelete,
  permission: (state) => state.permission,
  fields: (state) => state.fields,
  flatFields: (state) => state.flatFields,
  headers: (state) => state.headers,
  items: (state) => state.items,
  loading: (state) => state.loading,
  pagination: (state) => state.pagination,
  mainKey: (state) => state.mainKey,
  hiddenActions: (state) => state.hiddenActions,
  hasRelation: (state) => (relation) =>
    Array.isArray(state.items[relation]) && state.items[relation].length > 0,
  mainLoading: (state) => {
    for (let key in state.loading) {
      if (state.loading[key]) return true;
    }
    Vue._event("templateLoaded");
    return false;
  },

  fieldsNotGrouped: () => {
    return (fields) => fields.filter((f) => !("group" in f));
  },

  fieldsGrouped: () => {
    return (fields) => {
      let grouped = {};
      fields.forEach((f) => {
        if ("group" in f) {
          if (!Array.isArray(grouped[f.group])) grouped[f.group] = [];
          grouped[f.group].push(f);
        }
      });
      return grouped;
    };
  },

  getItemsWithKey: (state) => (key) => {
    return state.items[key ? key : state.mainKey]
      ? state.items[key ? key : state.mainKey]
      : [];
  },

  getOptionWithKey: (state) => (key) => {
    return state.options && key in state.options ? state.options[key] : false;
  },

  getRouteWithKey: (state) => (key) => {
    return state.routes[key] ? state.routes[key] : false;
  },

  findFieldWithKey: (state) => (key) => {
    return state.flatFields.filter((f) => f.field == key)[0];
  },

  rules: (state) => {
    let rules = {};
    state.flatFields.forEach((field) => {
      if ("rules" in field) {
        rules[field.field] = [];
        let exploded = field.rules.split("|");
        let rawRules = exploded.map((rule) => {
          let tmp = rule.split(":");
          let name = tmp[0];
          let args = tmp[1] ? tmp[1] : null;
          return { name, args };
        });
        rawRules.forEach((rule) => {
          let fnRule = validations.getValidation(rule.name, rule.args);
          rules[field.field].push(fnRule);
        });
      }
    });
    return rules;
  },
};

/*******************************************************/
const mutations = {
  resetState: (state) => {
    // state.notifs = [];
    state.items = [];
    state.options = [];
    state.loading = {};
    state.pagination = {
      currentPage: 1,
      total: 0,
    };
    state.routes = [];
    state.mainKey = false;
    state.reloadAfterSave = false;
    state.fields = [];
    state.hiddenActions = [];
    state.flatFields = [];
    state.backup = false;
    state.headers = [];
    state.filterData = {
      arrays: {},
      dates: {},
      selects: {},
      search: {},
      fields: {},
      itemPerPage: 15,
    };
    state.relationsFeched = false;
    state.isFiltering = false;
    Vue._bus.$off("readyToFetchRelations");
  },

  setReloadAfterSave: (state, payload) => (state.reloadAfterSave = payload),

  addActionsToHeader: (state, permission) => {
    permission &&
      state.headers.push({
        text: "اقدامات",
        title: "اقدامات",
        sortable: false,
        value: "actions",
        type: "text",
        align: "left",
      });
  },

  addRoutes: (state, payload) => {
    let key =
      typeof payload == "string"
        ? payload.substr(payload.lastIndexOf("/") + 1)
        : payload.key;

    state.mainKey = state.mainKey ? state.mainKey : toPascalCase(key);

    return (state.routes[toPascalCase(key)] =
      typeof payload == "string" ? payload : payload.route);
  },

  removeRoute: (state, payload) => {
    state.routes = state.routes.filter(
      (route) => !(route.field == payload || route.url == payload)
    );
  },

  set: (state, payload) => {
    state.items[payload.key] = payload.data;
    state.items = { ...state.items };
  },

  setRelationsFeched: (state, payload) => {
    state.relationsFeched = payload;
  },

  setHeaders: (state) => {
    state.headers = state.flatFields
      .filter((item) => item.isHeader)
      .map((item) => {
        return {
          text: item.title,
          sortable: false,
          value: item.field,
          model: item.rel?.model,
          multiple: item?.multiple,
          type: item.type,
          values: item.values,
          item_text: item.item_text,
          item_value: item.item_value,
          ...item,
        };
      });
    state.headers.unshift(
      {
        text: "#",
        title: "شماره",
        type: "text",
        value: "index",
        field: "index",
        sortable: false,
      },
      {
        title: "شناسه",
        text: "شناسه",
        type: "text",
        value: "id",
        field: "id",
        class: { header: "mamad-header" },
      }
    );
  },

  setMainKey: (state, payload) => (state.mainKey = payload),

  setHiddenActions: (state, payload) => (state.hiddenActions = payload),

  setShowEdit: (state, payload) => (state.showEdit = payload),

  setShowDelete: (state, payload) => (state.showDelete = payload),

  setFields: (state, payload) => {
    state.fields = payload;
    state.flatFields = Array.isArray(state.fields)
      ? state.fields
      : Object.values(state.fields).flat();
    if (!state.backup) {
      state.backup = {
        fields: Array.isArray(state.fields)
          ? [...state.fields]
          : { ...state.fields },
        flatFields: [...state.flatFields],
      };
    }
  },

  restoreBackup: (state) => {
    if (state.backup) {
      state.fields = state.backup.fields;
      state.flatFields = state.backup.flatFields;
    }
  },

  mergeField: (state, payload) => {
    let temp = state.flatFields.map((f) => {
      if (f.field == payload.field) {
        return { ...f, ...payload.value };
      }
      return f;
    });
    state.flatFields = [...temp];

    if (Array.isArray(state.fields)) {
      temp = state.fields.map((f) => {
        if (f.field == payload.field) {
          return { ...f, ...payload.value };
        }
        return f;
      });
      state.fields = [...temp];
    } else {
      temp = {};
      for (const property in state.fields) {
        temp[property] = state.fields[property].map((f) => {
          if (f.field == payload.field) {
            return { ...f, ...payload.value };
          }
          return f;
        });
      }
      state.fields = { ...temp };
    }
    // mamad: برای این که دو تب دارد عوض نمی کند
  },

  add: (state, payload) => {
    let temp = state.items[state.mainKey];
    temp = [...payload, ...temp];
    state.items[state.mainKey] = [...temp];
  },

  remove: (state, payload) => {
    let temp = state.items[state.mainKey];
    temp = temp.filter((item) => item.id != payload);
    state.items[state.mainKey] = [...temp];
    state.items = { ...state.items };
  },

  setLoading: (state, payload) => {
    state.loading[payload.key] = payload.value;
    state.loading = { ...state.loading };
  },

  setPagination: (state, payload) => (state.pagination = payload),

  editItem: (state, payload) => {
    let temp = state.items[state.mainKey];
    temp = temp.map((item) => {
      if (item.id == payload.id) return payload;
      return item;
    });
    state.items[state.mainKey] = [...temp];
  },

  setPermission: (state, payload) => (state.permission = payload),

  setOptions: (state, payload) => (state.options = payload),
};

/*******************************************************/
const actions = {
  init({ state, commit, dispatch, rootState }, payload) {
    Vue._resetEvLi(() => {
      Vue._listen("alert", (data) => {
        dispatch("alert/alert", data, { root: true });
      });
    });

    commit("resetState");
  
    Vue._event("beforeTemplateInit");

    commit("addRoutes", payload.mainRoute);
    if (state.isFiltering) {
      dispatch("getWithFilter", { key: state.mainKey });
    } else {
      dispatch("get", { key: state.mainKey });
    }

    commit("setOptions", "options" in payload ? payload.options : {});
    commit("setFields", payload.fields);
    // register listenres
    state.flatFields.forEach(
      (field) =>
        "init" in field && field.init({ commit, dispatch, state, rootState })
    );
    // end of listening
    commit("setHeaders");

    commit("setHiddenActions", payload.hiddenActions);

    dispatch("getRelations", {
      relations: payload?.relations ? payload.relations : [],
      sum: payload?.sum,
    });

    commit("setShowEdit", "showEdit" in payload ? payload.showEdit : true);

    commit(
      "setShowDelete",
      "showDelete" in payload ? payload.showDelete : true
    );
  },

  midit({ commit, dispatch }, payload) {
    if (payload.sum) {
      dispatch("getSum", { relations: payload.relations });
    } else {
      payload.relations.forEach(async (link) => {
        await commit("addRoutes", link);
        await dispatch("get", {
          all: true,
          key:
            typeof link == "string"
              ? toPascalCase(link.substr(link.lastIndexOf("/") + 1))
              : link.key,
        });
      });
    }
  },

  get({ state, commit }, payload) {
    let page = 1;
    if (payload && payload.page) page = payload.page;
    let query = payload && payload.all ? "allMain=true" : "";
    let pageQuery =
      state.routes[payload.key].indexOf("?") > -1 ? "&page=" : "?page=";

    commit("setLoading", { key: payload.key, value: true });

    axios
      .get(state.routes[payload.key] + pageQuery + page + "&" + query)
      .then((response) => {
        commit("set", { data: response[payload.key].data, key: payload.key });
        if (payload.key == state.mainKey) {
          commit("setPagination", {
            total: response[state.mainKey].total,
            currentPage: response[state.mainKey].current_page,
            lastPage: response[state.mainKey].last_page,
          });

          !state.relationsFeched && Vue._event("readyToFetchRelations");
          commit("setRelationsFeched", true);
        }
      })
      .finally(() => {
        commit("setLoading", { key: payload.key, value: false });
      });
  },

  reloadMainData({ state, commit }, payload) {
    let page = 1;
    if (payload && payload.page) page = payload.page;
    let query = payload && payload.all ? "allMain=true" : "";
    let pageQuery =
      state.routes[state.mainKey].indexOf("?") > -1 ? "&page=" : "?page=";

    commit("setLoading", { key: state.mainKey, value: true });

    axios
      .get(state.routes[state.mainKey] + pageQuery + page + "&" + query)
      .then((response) => {
        commit("set", {
          data: response[state.mainKey].data,
          key: state.mainKey,
        });
        if (state.mainKey == state.mainKey) {
          commit("setPagination", {
            total: response[state.mainKey].total,
            currentPage: response[state.mainKey].current_page,
            lastPage: response[state.mainKey].last_page,
          });
        }
      })
      .finally(() => {
        commit("setLoading", { key: state.mainKey, value: false });
      });
  },

  getSum({ commit }, payload) {
    let models = payload.relations.map((link) =>
      typeof link == "string"
        ? toPascalCase(link.substr(link.lastIndexOf("/") + 1))
        : link.key
    );

    models.forEach((model) => {
      commit("setLoading", { key: model, value: true });
    });

    axios
      .post("/sum-model", {
        Model: models,
      })
      .then((response) => {
        for (const property in response.Model) {
          commit("set", {
            data: response.Model[property].data,
            key: property,
          });
        }
      })
      .finally(() => {
        models.forEach((model) => {
          commit("setLoading", { key: model, value: false });
        });
      });
  },

  getWithFilter({ state, commit }, payload) {
    let page = 1;
    if (payload && payload.page) page = payload.page;

    let itemPerPage = payload && payload.itemPerPage ? payload.itemPerPage : 15;

    commit("setLoading", { key: state.mainKey, value: true });
    axios
      .post(`/filter?page=${page}`, {
        model: state.mainKey,
        search: state.filterData.search,
        selects: state.filterData.selects,
        dates: state.filterData.dates,
        arrays: state.filterData.arrays,
        fields: state.filterData.fields,
        order: state.filterData.order,
        state: state.filterData.state,
        itemPerPage: itemPerPage,
      })
      .then((response) => {
        if (itemPerPage == 15) {
          commit("set", {
            data: response[state.mainKey].data,
            key: state.mainKey,
          });
          commit("setPagination", {
            total: response[state.mainKey].total,
            currentPage: response[state.mainKey].current_page,
            lastPage: response[state.mainKey].last_page,
          });
        }
        commit("setCsvData", response[state.mainKey].data);
        commit("setPrintItems", response[state.mainKey].data);
        !state.relationsFeched && Vue._event("readyToFetchRelations");
        commit("setRelationsFeched", true);
      })
      .finally(() => {
        commit("setLoading", { key: state.mainKey, value: false });
      });
  },

  add({ state, commit, dispatch }, payload) {
    let route = { value: false };

    state.flatFields.forEach((field) => {
      if ("onSave" in field) {
        field.onSave(state.items[field.rel.model], payload, route);
      }
    });

    commit("setLoading", { key: state.mainKey, value: true });

    route = route.value ? route.value : state.routes[state.mainKey];

    axios
      .post(route, { [state.mainKey]: { ...payload } })
      .then((response) => {
        let newItems = Array.isArray(response[state.mainKey])
          ? response[state.mainKey]
          : [response[state.mainKey]];
        !state.reloadAfterSave && commit("add", newItems);
        dispatch(
          "alert/alert",
          { text: "با موفقیت ثبت شد", color: "green" },
          { root: true }
        );
        Vue._event("handleCEDialog", false);
        (payload.reload || state.reloadAfterSave) && dispatch("reloadMainData");
        state.reloadAfterSave = false;
      })
      .catch((error) => {
        dispatch(
          "alert/alert",
          { text: error.response.data.message, color: "red" },
          { root: true }
        );
      })
      .finally(() => {
        commit("setLoading", { key: state.mainKey, value: false });
      });
  },

  remove({ state, dispatch, commit }, payload) {
    payload = Array.isArray(payload) ? payload : [payload];
    commit("setLoading", { key: state.mainKey, value: true });
    let route = state.routes[state.mainKey].split("?")[0];

    payload.forEach((item, index) => {
      axios
        .$delete(route + "/" + item)
        .then(() => {
          commit("remove", item);
          dispatch(
            "alert/alert",
            { text: "با موفقیت حذف شد", color: "green" },
            { root: true }
          );
          Vue._event("handleDeleteDialog", false);
        })
        .catch((error) => {
          dispatch(
            "alert/alert",
            { text: error.response.data.message, color: "red" },
            { root: true }
          );
        })
        .finally(() => {
          index == payload.length - 1 &&
            commit("setLoading", { key: state.mainKey, value: false });
        });
    });
  },

  edit({ state, commit, dispatch }, payload) {
    let route = state.routes[state.mainKey].split("?")[0];

    if ("route" in payload) {
      route = payload.route;
    }

    axios
      .patch(route + "/" + payload.id, {
        [state.mainKey]: { ...payload },
      })
      .then((response) => {
        commit("editItem", response[state.mainKey]);
        dispatch(
          "alert/alert",
          { text: "با موفقیت ویرایش شد", color: "green" },
          { root: true }
        );
        if (!("closeAfterEdit" in payload && !payload.closeAfterEdit))
          Vue._event("handleCEDialog", false);
        payload.reload && dispatch("get", { key: state.mainKey });
      })
      .catch((error) => {
        dispatch(
          "alert/alert",
          { text: error.response.data.message, color: "red" },
          { root: true }
        );
      })
      .finally(() => {});
  },

  getRelations({ commit, dispatch }, payload) {
    Vue._listen("readyToFetchRelations", async () => {
      if (payload.sum) {
        dispatch("getSum", { relations: payload.relations });
      } else {
        payload.relations.forEach(async (link) => {
          await commit("addRoutes", link);
          await dispatch("get", {
            all: true,
            key:
              typeof link == "string"
                ? toPascalCase(link.substr(link.lastIndexOf("/") + 1))
                : link.key,
          });
        });
      }
    });
  },
};

export default {
  actions,
  mutations,
  getters,
  state,
};
