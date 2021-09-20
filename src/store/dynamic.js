import filterHeader from "./dynamicStores/filterHeader";
import main from "./dynamicStores/main";
import print from "./dynamicStores/print";
import utilities from "./dynamicStores/utilities";
import csv from "./dynamicStores/csv";
import filter from "./dynamicStores/filter";

const state = () => ({
  ...filterHeader.state,
  ...main.state,
  ...print.state,
  ...csv.state,
  ...filter.state,
});

const getters = {
  ...filterHeader.getters,
  ...main.getters,
  ...print.getters,
  ...utilities.getters,
  ...csv.getters,
  ...filter.getters,
};

const mutations = {
  ...filterHeader.mutations,
  ...main.mutations,
  ...print.mutations,
  ...csv.mutations,
  ...filter.mutations,
};

const actions = {
  ...filterHeader.actions,
  ...main.actions,
};

export default {
  actions,
  mutations,
  getters,
  state,
};
