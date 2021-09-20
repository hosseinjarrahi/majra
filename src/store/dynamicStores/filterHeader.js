const state = {
  headerFilters: {},
};

const getters = {
  headerFilters: (state) => state.headerFilters,
};

const mutations = {
  setHeaderFilters: (state, payload) => (state.headerFilters = payload),
};

const actions = {
  parentChanged({ state, commit, getters }, { field, values }) {
    let items = getters.getItemsWithKey(field.rel.child.model);
    if (!values.length) {
      let filters = { ...state.headerFilters };
      filters[field.rel.child.model] = items;
      commit("setHeaderFilters", filters);
      return;
    }

    let output = items.filter((item) => {
      if (item[field.rel.child.ownKey])
        return values.indexOf(item[field.rel.child.ownKey].id) > -1;
      return false;
    });
    let filters = { ...state.headerFilters };
    filters[field.rel.child.model] = output;
    commit("setHeaderFilters", filters);
  },
};

export default {
  actions,
  mutations,
  getters,
  state,
};
