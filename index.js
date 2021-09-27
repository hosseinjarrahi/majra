import dynamic from "./src/store/dynamic";
import DynamicTemplate from "./src/components/DynamicTemplate";
import DynamicFields from "./src/components/dynamicForm/DynamicFields";

let MajraPlugin = {
  install: function (Vue, { store }) {
    store.registerModule("dynamic", dynamic);
  },
};

export default MajraPlugin;

export { DynamicTemplate, DynamicFields };
