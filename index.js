import dynamic from "./src/store/dynamic";
import DynamicTemplate from "./src/components/DynamicTemplate";
import DynamicFields from "./src/components/dynamicForm/DynamicFields";
import { EventBusPlugin } from "./src/plugins/eventBus";
import { HelpersPlugin } from "./src/plugins/helpers";
import { MajraFuncs } from "./src/plugins/majraFuncs";

let MajraPlugin = {
  install: function (Vue, { store, configs }) {
    Vue.use(EventBusPlugin);
    Vue.use(HelpersPlugin);
    Vue.use(MajraFuncs, { configs });
    store.registerModule("dynamic", dynamic);
  },
};

export default MajraPlugin;

export { DynamicTemplate, DynamicFields };
