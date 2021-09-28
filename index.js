import dynamic from "./src/store/dynamic";
import DynamicTemplate from "./src/components/DynamicTemplate";
import DynamicFields from "./src/components/dynamicForm/DynamicFields";
import { EventBusPlugin } from "./src/plugins/eventBus";
import { HelpersPlugin } from "./src/plugins/helpers";

let MajraPlugin = {
  install: function (Vue, { store, uploadPath }) {
    Vue.use(EventBusPlugin);
    Vue.use(HelpersPlugin);
    store.registerModule("dynamic", dynamic);
    Vue.prototype.UPLOAD_PATH = uploadPath ? uploadPath : "/upload";
  },
};

export default MajraPlugin;

export { DynamicTemplate, DynamicFields };
