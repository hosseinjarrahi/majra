const state = {
  csvData: [],
};

const getters = {
  csvData: (state) => state.csvData,
  csvValues: (state) => {
    const standardValue = (value, field) => {
      // need to edit value to persian
      if (field.type === "date") return value;

      if (field.type === "text" || value === null) return value;

      if (Array.isArray(value))
        if (value.length > 0 && typeof value[0] == "object") {
          return value
            .map((val) => val[this.$helpers.getSafe(field, "props.item-text")])
            .join(" | ");
        } else {
          return value.join(" | ");
        }
      else if (typeof value == "object") {
        return value[this.$helpers.getSafe(field, "props.item-text")];
      }
    };

    return state.csvData
      ? state.csvData.map((item) => {
          let out = {};
          state.flatFields.forEach((field) => {
            out[field.title] = standardValue(item[field.field], field);
          });
          return out;
        })
      : [];
  },
};

const mutations = {
  setCsvData: (state, payload) => (state.csvData = payload),
};

export default {
  mutations,
  getters,
  state,
};
