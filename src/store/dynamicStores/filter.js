const state = {
  filterData: {
    arrays: {},
    order: {},
    dates: {},
    selects: {},
    has: {},
    excepts: {},
    search: "",
    fields: {},
    itemPerPage: 15,
  },
  isFiltering: false,
};

const getters = {
  filterData: (state) => state.filterData,
  isFiltering: (state) => state.isFiltering,
};

const mutations = {
  setIsFiltering: (state, payload) => (state.isFiltering = payload),

  setFilterData: (state, payload) => {
    if (payload.key) {
      console.log(state.filterData);
      state.filterData[payload.field][payload.key] = payload.data;
    } else state.filterData[payload.field] = payload.data;

    state.filterData = { ...state.filterData };
  },

  resetFilters(state) {
    state.filterData = {
      arrays: {},
      order: {},
      dates: {},
      selects: {},
      has: {},
      excepts: {},
      search: "",
      fields: {},
      itemPerPage: 15,
    };
  },
};

const actions = {};

export default {
  mutations,
  getters,
  actions,
  state,
};
