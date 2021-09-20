const state = {
  printItems: [],
  printHeaders: [],
};

const getters = {
  printItems: (state) => state.printItems,
  printHeaders: (state) => state.printHeaders,
};

const mutations = {
  setPrintItems: (state, payload) => (state.printItems = payload),
  setPrintHeaders: (state, payload) => (state.printHeaders = payload),
};

export default {
  mutations,
  getters,
  state,
};
