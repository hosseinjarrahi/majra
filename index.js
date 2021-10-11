import dynamic from "./src/store/dynamic";
import DynamicTemplate from "./src/components/DynamicTemplate";
import DynamicFields from "./src/components/dynamicForm/DynamicFields";
import DynamicForm from "./src/components/DynamicForm";
import Alert from "./src/components/utilities/Alert";
import AbstractField from "./src/components/fields/AbstractField";
import FieldSet from "./src/components/utilities/FieldSet";
import EventBusPlugin from "./src/plugins/eventBus";
import HelpersPlugin from "./src/plugins/helpers";
import MajraFuncs from "./src/plugins/majraFuncs";
import Axios from "./src/plugins/axios";

export default {
  install: function (Vue, { store, configs }) {
    Vue.use(EventBusPlugin);
    Vue.use(HelpersPlugin);
    Vue.use(MajraFuncs, { store, configs });
    Vue.use(Axios, configs.axios);
    store.registerModule("dynamic", dynamic);
  },
};

export {
  DynamicTemplate,
  DynamicFields,
  DynamicForm,
  FieldSet,
  Alert,
  AbstractField,
};
