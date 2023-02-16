import dynamic from "./store/dynamic";
import DynamicTemplate from "./components/DynamicTemplate";
import DynamicFields from "./components/dynamicForm/DynamicFields";
import DynamicForm from "./components/DynamicForm";
import DynamicList from "./components/DynamicList";
import DynamicShow from "./components/DynamicShow";
import Alert from "./components/utilities/Alert";
import AbstractField from "./components/fields/AbstractField";
import FieldSet from "./components/utilities/FieldSet";
import EventBusPlugin from "./plugins/eventBus";
import HelpersPlugin from "./plugins/helpers";
import MajraFuncs from "./plugins/majraFuncs";
import Axios from "./plugins/axios";
import { selectedLang, translate } from "./helpers/tr";

export default {
  install: function (Vue, { store, configs }) {
    Vue.prototype.translate = translate;
    Vue.translate = translate;

    Vue.use(EventBusPlugin);
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
  DynamicShow,
  selectedLang,
  DynamicList,
};
