import dynamic from "./src/store/dynamic";
import DynamicTemplate from "./src/components/DynamicTemplate";
import DynamicFields from "./src/components/dynamicForm/DynamicFields";
import { EventBusPlugin } from "./src/plugins/eventBus";
import { HelpersPlugin } from "./src/plugins/helpers";

let MajraPlugin = {
  install: function (Vue, { store, uploadPath,withKey }) {
    Vue.use(EventBusPlugin);
    Vue.use(HelpersPlugin);
    store.registerModule("dynamic", dynamic);
    Vue.prototype.$conf = {
      UPLOAD_PATH : uploadPath ? uploadPath : "/upload",
      WITH_KEY : withKey ? withKey : true
    }
  },
};

export default MajraPlugin;

export { DynamicTemplate, DynamicFields };
